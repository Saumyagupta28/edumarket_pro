# 🚀 EduMarket Pro Deployment Guide

This guide provides step-by-step instructions for deploying the EduMarket Pro application to various hosting platforms.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- GitHub account

## 🏗️ Build Configuration

The project uses Vite as the build tool with the following configuration:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18
- **Package Manager**: npm

## 🌐 Deployment Options

### 1. Netlify Deployment

#### Option A: Git Integration (Recommended)

1. **Connect Repository**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Deploy**:
   - Click "Deploy site"
   - Your site will be available at `https://your-site-name.netlify.app`

#### Option B: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `dist` folder to the deploy area

### 2. Vercel Deployment

#### Option A: Git Integration (Recommended)

1. **Connect Repository**:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**:
   - Click "Deploy"
   - Your site will be available at `https://your-project.vercel.app`

#### Option B: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

### 3. GitHub Pages Deployment

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" - Select"GitHub Actions" as source

2. **Configure GitHub Actions**:
   - The workflow file is already included in `.github/workflows/deploy.yml`
   - Push to main branch to trigger deployment

3. **Access Your Site**:
   - Your site will be available at `https://yourusername.github.io/repository-name`

### 4. Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Configure**:
   - Public directory: `dist`
   - Single-page app: Yes
   - Automatic builds: No

4. **Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=EduMarket Pro
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

**For Production Deployment**:
- Set environment variables in your hosting platform's dashboard
- Never commit sensitive keys to version control
- Use the `.env.example` file as a template

## 🎯 Custom Domain Setup

### Netlify Custom Domain

1. Go to your site settings in Netlify
2. Navigate to "Domain settings" 3. Click"Add custom domain"
4. Follow the DNS configuration instructions

### Vercel Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### GitHub Pages Custom Domain

1. Add a `CNAME` file to your `public` directory with your domain
2. Configure DNS records with your domain provider
3. Enable HTTPS in repository settings

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Routing Issues**:
   - Ensure SPA redirects are configured
   - Check the `_redirects` file for Netlify
   - Verify `vercel.json` configuration for Vercel

3. **Environment Variables**:
   - Prefix all variables with `VITE_`
   - Set variables in hosting platform dashboard
   - Restart build after adding new variables

4. **404 Errors**:
   - Configure proper redirects for SPA routing
   - Check that all routes are properly defined

### Performance Optimization

1. **Enable Compression**:
   - Most hosting platforms enable gzip compression by default
   - Verify compression is working with browser dev tools

2. **Configure Caching**:
   - Static assets are cached for 1 year
   - HTML files are not cached to ensure updates are reflected

3. **Optimize Images**:
   - Use appropriate image formats (WebP when supported)
   - Implement lazy loading for images

## 📊 Monitoring

- **Netlify**: Use Netlify Analytics for traffic insights
- **Vercel**: Access Vercel Analytics for performance metrics
- **GitHub Pages**: Use Google Analytics for detailed tracking

## 🔒 Security

- Enable HTTPS (automatic on most platforms)
- Configure proper CORS headers
- Implement Content Security Policy (CSP)
- Regular security audits with `npm audit`

## 📈 Scaling

- **CDN**: Most platforms provide global CDN automatically
- **Serverless Functions**: Use for API endpoints (Netlify Functions, Vercel Functions)
- **Database**: Consider serverless database options (Firebase, Supabase)

## 🎉 Success!

Your EduMarket Pro application should now be successfully deployed! 

For any issues or questions, please refer to the respective platform's documentation or create an issue in the repository.