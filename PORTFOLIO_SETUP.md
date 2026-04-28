# Portfolio Setup & Deployment Guide

This guide will help you build, preview, and deploy your al-folio portfolio website.

## Prerequisites

- Docker Desktop (recommended) OR Ruby + Jekyll
- Git
- GitHub account

## Quick Start with Docker (Recommended)

### 1. Initial Setup & Preview

```bash
# Navigate to your portfolio directory
cd c:\Users\HP\portfolio\portfolio

# Pull the latest Docker image and start the development server
docker compose pull
docker compose up
```

Your site will be available at **http://localhost:8080**

### 2. Making Changes

After editing any files:

```bash
# Stop the server (Ctrl+C)
# Rebuild and restart
docker compose up --build
```

### 3. Stop the Server

```bash
docker compose down
```

## Adding Your Profile Picture

1. Add your profile picture to `assets/img/`
2. Name it `prof_pic.jpg` (or update the filename in `_pages/about.md`)
3. Recommended size: 400x400 pixels minimum

## Customization Checklist

### ✅ Already Completed
- [x] Personal information in `_config.yml`
- [x] Resume data in `assets/json/resume.json`
- [x] About page with bio
- [x] Project pages (EVA, Muse, NotePro)
- [x] News announcements
- [x] IEEE publication in bibliography

### 🔧 Additional Customizations

#### Social Media Links

Edit `_config.yml` and add your social profiles. The theme uses jekyll-socials plugin. You'll need to configure:

```yaml
# Add to _config.yml (search for social section)
github_username: dp291203
linkedin_username: divya-aamuktha
twitter_username: your_twitter  # optional
scholar_userid: your_google_scholar_id  # optional
orcid_id: your_orcid  # optional
```

#### Update Colors/Theme

Edit `_sass/_themes.scss` to customize colors and appearance.

#### Add Blog Posts

Create new markdown files in `_posts/` directory:

```markdown
---
layout: post
title: Your Post Title
date: 2025-01-15
description: Brief description
tags: ai robotics
categories: technical
---

Your content here...
```

## Deployment to GitHub Pages

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a GitHub repository** named `portfolio` (or any name you prefer)

2. **Update `_config.yml`** with your GitHub username:
   ```yaml
   url: https://dp291203.github.io
   baseurl: /portfolio  # Use /portfolio if repo name is 'portfolio', leave blank if repo name is dp291203.github.io
   ```

3. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/dp291203/portfolio.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: Select `gh-pages` (will be created automatically by GitHub Actions)
   - Click Save

5. **Wait for deployment** (usually 2-5 minutes)
   - Check the Actions tab to see build progress
   - Your site will be live at `https://dp291203.github.io/portfolio/`

### Option 2: Custom Domain

If you have a custom domain:

1. Add a `CNAME` file to the root with your domain name
2. Update DNS settings with your domain provider
3. Update `url` in `_config.yml` to your custom domain

## Pre-Commit Checklist

Before every commit, run these steps:

### 1. Format Code with Prettier

```bash
# First time only - install prettier
npm install --save-dev prettier @shopify/prettier-plugin-liquid

# Format all files
npx prettier . --write
```

### 2. Build and Test Locally

```bash
# Rebuild the site
docker compose up --build

# Visit http://localhost:8080
# Check:
# - Navigation works
# - All pages load correctly
# - Images display properly
# - Dark mode toggle works
# - Projects page shows your projects
# - Publications page shows your paper
# - CV page displays correctly
```

### 3. Commit Changes

```bash
git add .
git commit -m "Descriptive commit message"
git push
```

## Troubleshooting

### Port 8080 Already in Use

```bash
# Stop all containers
docker compose down

# Or change port in docker-compose.yml
```

### Changes Not Showing

```bash
# Force rebuild
docker compose down
docker compose up --build --force-recreate
```

### GitHub Pages Not Updating

- Check Actions tab for build errors
- Ensure `gh-pages` branch exists
- Verify `baseurl` in `_config.yml` matches your repo name
- Clear browser cache

### Images Not Loading

- Check image paths are correct (relative to assets/img/)
- Ensure images are committed to git
- Verify image file extensions match references

## File Structure Overview

```
portfolio/
├── _config.yml              # Main configuration
├── _pages/
│   ├── about.md            # Homepage/About page
│   ├── cv.md               # CV page (uses resume.json)
│   ├── projects.md         # Projects listing
│   └── publications.md     # Publications page
├── _projects/              # Individual project pages
│   ├── eva_robot.md
│   ├── muse_music.md
│   └── notepro.md
├── _news/                  # News/announcements
├── _bibliography/
│   └── papers.bib          # Your publications
├── assets/
│   ├── img/                # Images
│   └── json/
│       └── resume.json     # Resume data
└── _posts/                 # Blog posts (optional)
```

## Next Steps

1. **Add your profile picture** to `assets/img/prof_pic.jpg`
2. **Add project images** to `assets/img/` and update project markdown files
3. **Review and customize** all pages
4. **Test locally** using Docker
5. **Deploy to GitHub Pages**
6. **Share your portfolio** on LinkedIn, resume, etc.

## Additional Resources

- [al-folio Documentation](https://github.com/alshedivat/al-folio)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Font Awesome Icons](https://fontawesome.com/icons)

## Support

For issues specific to al-folio theme:
- [GitHub Issues](https://github.com/alshedivat/al-folio/issues)
- [Discussions](https://github.com/alshedivat/al-folio/discussions)

---

**Your portfolio is ready!** 🎉

Visit http://localhost:8080 to preview it locally, then deploy to GitHub Pages to share it with the world.
