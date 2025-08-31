# Deployment Guide for Quiz Master

This guide will help you deploy your Quiz Master application to various hosting platforms.

## 🚀 Quick Deploy Options

### Option 1: Netlify (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: Quiz Master app"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - Go to Site settings > Domain management
   - Add your custom domain
   - Follow DNS configuration instructions

### Option 2: Vercel

1. **Push your code to GitHub** (same as above)

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to main branch triggers a new deployment
   - Preview deployments for pull requests

### Option 3: GitHub Pages

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Set source to "GitHub Actions"
   - Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🔧 Environment Variables

No environment variables are required for this application as it uses public APIs.

## 📁 Build Output

After running `npm run build`, the `dist/` folder contains:
- `index.html` - Main HTML file
- `assets/` - JavaScript and CSS bundles
- All static assets

## 🌐 Custom Domain Setup

### Netlify
1. Add custom domain in site settings
2. Update DNS records:
   - A record: `75.2.60.5`
   - CNAME record: `yourdomain.com` → `yoursite.netlify.app`

### Vercel
1. Add domain in project settings
2. Update DNS records as instructed by Vercel

## 📱 Performance Optimization

The app is already optimized with:
- Vite build optimization
- Tailwind CSS purging
- React 19 optimizations
- Lazy loading for routes

## 🔍 Testing Before Deploy

1. **Local build test**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check for errors**
   - No console errors
   - All routes work
   - API calls succeed
   - Responsive design works

## 🚨 Troubleshooting

### Build Errors
- Check Node.js version (18+ required)
- Clear node_modules and reinstall
- Verify all dependencies are installed

### Runtime Errors
- Check browser console for errors
- Verify API endpoints are accessible
- Test on different browsers/devices

### Deployment Issues
- Verify build command and output directory
- Check hosting platform logs
- Ensure repository is public or connected properly

## 📊 Analytics & Monitoring

### Netlify
- Built-in analytics
- Performance monitoring
- Error tracking

### Vercel
- Web vitals monitoring
- Performance insights
- Error tracking

## 🔄 Continuous Deployment

Both Netlify and Vercel support automatic deployments:
- Push to main branch → automatic deploy
- Pull requests → preview deployments
- Custom branch deployments

## 📞 Support

If you encounter issues:
1. Check the hosting platform's documentation
2. Review build logs
3. Test locally first
4. Check browser console for errors

---

**Happy Deploying! 🚀** 