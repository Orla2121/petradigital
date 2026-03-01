const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// In-memory data store (replace with database in production)
let projects = [
    { 
        id: 1, 
        title: 'Botanical Skincare Brand', 
        description: 'A complete visual ecosystem for a premium organic skincare line.', 
        tags: ['Branding', 'Canva Systems'], 
        imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200',
        galleryUrls: [
            'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800'
        ],
        content: 'We overhauled the digital storefront to match the physical product quality. By implementing a 10-day sprint, we moved from concept to a fully realized social kit that increased engagement by 40%.'
    },
    { 
        id: 2, 
        title: 'Nexus Tech Launch', 
        description: 'Strategic B2B positioning and LinkedIn optimization for a SaaS startup.', 
        tags: ['B2B', 'Digital Design'], 
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
        galleryUrls: [],
        content: 'Professionalism meets innovation. We created a high-converting content system that allowed the founders to scale their outreach with total brand consistency.'
    },
    { 
        id: 3, 
        title: 'The Daily Grind', 
        description: 'Refreshing a local staple for a new generation of digital natives.', 
        tags: ['Social Strategy', 'Content'], 
        imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
        galleryUrls: [
            'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800'
        ],
        content: 'A local cafe rebrand that focused on "Digital First" touchpoints. Custom highlight covers and grid layouts turned followers into regulars.'
    }
];

let logo = null;

// ==================== API ROUTES ====================

// Get all projects
app.get('/api/projects', (req, res) => {
    res.json({ success: true, data: projects });
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
});

// Create new project
app.post('/api/projects', (req, res) => {
    const { title, description, content, tags, imageUrl, galleryUrls } = req.body;
    
    const newProject = {
        id: Date.now(),
        title: title || 'Untitled Project',
        description: description || '',
        content: content || '',
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
        imageUrl: imageUrl || '',
        galleryUrls: galleryUrls || []
    };
    
    projects.unshift(newProject);
    res.status(201).json({ success: true, data: newProject });
});

// Update project
app.put('/api/projects/:id', (req, res) => {
    const { title, description, content, tags, imageUrl, galleryUrls } = req.body;
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    projects[index] = {
        ...projects[index],
        title: title || projects[index].title,
        description: description || projects[index].description,
        content: content || projects[index].content,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : projects[index].tags),
        imageUrl: imageUrl || projects[index].imageUrl,
        galleryUrls: galleryUrls || projects[index].galleryUrls
    };
    
    res.json({ success: true, data: projects[index] });
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    projects.splice(index, 1);
    res.json({ success: true, message: 'Project deleted successfully' });
});

// Upload project image
app.post('/api/projects/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, data: { url: imageUrl } });
});

// Upload gallery images
app.post('/api/projects/gallery/upload', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    
    const urls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ success: true, data: { urls } });
});

// Get logo
app.get('/api/logo', (req, res) => {
    res.json({ success: true, data: logo });
});

// Upload logo (SVG only)
app.post('/api/logo', upload.single('logo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    if (req.file.mimetype !== 'image/svg+xml') {
        // Delete the uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ success: false, message: 'Only SVG files are allowed for logo' });
    }
    
    logo = `/uploads/${req.file.filename}`;
    res.json({ success: true, data: { url: logo } });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    // In production, you would send email or save to database
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ success: true, message: 'Thank you for your inquiry! We will get back to you soon.' });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Petra Digital API Server running on http://localhost:${PORT}`);
    console.log(`📁 Upload directory: ${uploadsDir}`);
});
