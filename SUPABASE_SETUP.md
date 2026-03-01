# Supabase Setup Guide for Petra Digital

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project" 
3. Sign up with GitHub or Email
4. Create a new project:
   - Name: `petra-digital`
   - Database Password: Create a strong password (remember it!)
   - Region: Select closest to you

## Step 2: Get Your Credentials
1. Go to **Settings** (⚙️ icon) → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 3: Create Database Tables
Go to **SQL Editor** in Supabase and run this SQL:

```
sql
-- Create projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional for public data)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public access" ON projects
  FOR SELECT USING (true);

-- Create policy to allow public insert
CREATE POLICY "Allow public insert" ON projects
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public update
CREATE POLICY "Allow public update" ON projects
  FOR UPDATE USING (true);

-- Create policy to allow public delete
CREATE POLICY "Allow public delete" ON projects
  FOR DELETE USING (true);

-- Insert sample projects
INSERT INTO projects (title, description, content, tags, image_url, gallery_urls) VALUES
('Botanical Skincare Brand', 'A complete visual ecosystem for a premium organic skincare line.', 'We overhauled the digital storefront to match the physical product quality.', ARRAY['Branding', 'Canva Systems'], 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200', ARRAY['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800']),
('Nexus Tech Launch', 'Strategic B2B positioning and LinkedIn optimization for a SaaS startup.', 'Professionalism meets innovation.', ARRAY['B2B', 'Digital Design'], 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200', ARRAY[]::text[]),
('The Daily Grind', 'Refreshing a local staple for a new generation of digital natives.', 'A local cafe rebrand.', ARRAY['Social Strategy', 'Content'], 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', ARRAY['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800']);
```

## Step 4: Update Frontend
After getting your Supabase credentials, update `index.html` with:
- Your Supabase URL
- Your anon key

## Step 5: Test
Open your deployed site and it should now load projects from Supabase!
