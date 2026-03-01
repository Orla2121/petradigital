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
Go to **SQL Editor** in Supabase and run this (do NOT include "sql" at the top):

```
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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public access
CREATE POLICY "Allow public access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON projects FOR DELETE USING (true);
```

## Step 4: Update Frontend
After getting your Supabase credentials, update `index.html` with:
- Your Supabase URL
- Your anon key

## Step 5: Test
Open your deployed site and it should now load projects from Supabase!
