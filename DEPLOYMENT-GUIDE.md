# 🚀 GitHub Pages Deployment Guide

## ✅ Your Site is Ready for Automatic Deployment!

Your Mind Bonanza site is configured to automatically build and deploy to GitHub Pages whenever you push changes.

## 📋 Current Configuration

### GitHub Actions Workflow
**File:** `.github/workflows/build.yml`

✅ **Triggers:**
- Automatically on every push to `main` or `master` branch
- Manually via GitHub Actions tab (workflow_dispatch)

✅ **What it does:**
1. Checks out your code
2. Sets up Node.js 18
3. Installs dependencies (`npm ci`)
4. Builds your Eleventy site (`npm run build`)
5. Deploys the `_site` folder to `gh-pages` branch

✅ **Custom Domain:** mindbonanza.com (configured via CNAME)

## 🎯 How to Deploy

### First Time Setup

1. **Enable GitHub Pages in your repository:**
   - Go to repository **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select branch: **gh-pages**
   - Select folder: **/ (root)**
   - Click **Save**

2. **Configure Custom Domain (if using mindbonanza.com):**
   - In Settings → Pages → Custom domain
   - Enter: `mindbonanza.com`
   - Click **Save**
   - Configure your DNS:
     ```
     Type: A Records
     Name: @
     Value: 
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
     
     Type: CNAME
     Name: www
     Value: <your-username>.github.io
     ```

### Every Time You Want to Deploy

Simply push your changes:

```bash
# 1. Stage your changes
git add .

# 2. Commit with a descriptive message
git commit -m "Add new blog post: [Your Post Title]"

# 3. Push to GitHub
git push origin main
```

That's it! GitHub Actions will automatically:
- Build your site
- Deploy to GitHub Pages
- Your changes will be live in 1-2 minutes

## 📁 Files Included in Deployment

The following files/folders are automatically deployed:

✅ **HTML Pages:**
- `index.html` (homepage)
- `blog/index.html` (blog listing)
- `posts/*/index.html` (individual blog posts)

✅ **Assets:**
- `css/main.css` (all styles)
- `js/main.js` (all scripts)

✅ **Configuration:**
- `CNAME` (custom domain)
- `.nojekyll` (GitHub Pages config)

## 🔍 Monitoring Deployments

### Check Deployment Status

1. **Go to your repository on GitHub**
2. **Click the "Actions" tab**
3. **View the latest workflow run**

You'll see:
- ✅ Green checkmark = Deployed successfully
- 🟡 Yellow dot = In progress
- ❌ Red X = Failed (check logs)

### View Build Logs

Click on any workflow run to see:
- Installation logs
- Build output
- Deployment status
- Error messages (if any)

## 🌐 Your Site URLs

### GitHub Pages URL
```
https://<your-username>.github.io/mindbonanza/
```

### Custom Domain (once configured)
```
https://mindbonanza.com
https://www.mindbonanza.com
```

## 🛠️ Troubleshooting

### Deployment Fails

**Check the build logs:**
1. Go to Actions tab
2. Click the failed workflow
3. Expand failed step
4. Read error message

**Common issues:**
- **npm ci fails**: Delete `package-lock.json`, run `npm install` locally, commit
- **Build fails**: Run `npm run build` locally to test
- **Permission denied**: Ensure repository has Actions enabled in Settings

### Site Not Updating

1. **Check if workflow ran:**
   - Visit Actions tab
   - Verify latest commit has a workflow run

2. **Clear browser cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)

3. **Check gh-pages branch:**
   - Switch to `gh-pages` branch
   - Verify files are updated

### Custom Domain Not Working

1. **Verify CNAME file:**
   ```bash
   cat src/CNAME
   # Should contain: mindbonanza.com
   ```

2. **Check DNS settings:**
   - May take 24-48 hours to propagate
   - Use [whatsmydns.net](https://www.whatsmydns.net/) to check

3. **Verify in GitHub Settings:**
   - Settings → Pages → Custom domain should show your domain

## 📝 Workflow File Explained

```yaml
name: Build and Deploy Eleventy Site

on:
  push:
    branches: [ main, master ]  # Trigger on push to these branches
  workflow_dispatch:             # Allow manual trigger

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest       # Use Ubuntu runner
    
    permissions:
      contents: write            # Required for gh-pages deployment
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4  # Get your code
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'       # Use Node 18
          cache: 'npm'             # Cache dependencies
      
      - name: Install Dependencies
        run: npm ci                # Install exact versions
      
      - name: Build Eleventy Site
        run: npm run build         # Build to _site folder
      
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site     # Deploy this folder
          cname: mindbonanza.com   # Your custom domain
```

## 🔄 Typical Deployment Workflow

```bash
# 1. Make changes locally
npm start                    # Test changes locally
# Visit http://localhost:8080 to preview

# 2. Create new blog post (if adding content)
# Create file: src/posts/my-new-post.md
# Add front matter and content

# 3. Build locally to test
npm run build

# 4. Commit and push
git add .
git commit -m "Add new blog post: Morning Meditation"
git push origin main

# 5. Wait 1-2 minutes
# Visit https://mindbonanza.com to see changes live!
```

## 🎯 Best Practices

1. **Always test locally before pushing:**
   ```bash
   npm start  # Preview changes
   npm run build  # Test build
   ```

2. **Use descriptive commit messages:**
   ```bash
   git commit -m "Add blog post: 10 Meditation Tips"
   git commit -m "Fix header styling on mobile"
   git commit -m "Update homepage hero image"
   ```

3. **Check deployment status:**
   - Don't assume it worked - check Actions tab
   - Review build logs for any warnings

4. **Keep dependencies updated:**
   ```bash
   npm update
   npm audit fix
   ```

## 📊 Deployment Timeline

| Action | Time |
|--------|------|
| Push to GitHub | Instant |
| Workflow triggered | ~5 seconds |
| Dependencies installed | ~30 seconds |
| Site built | ~5 seconds |
| Deployed to gh-pages | ~10 seconds |
| **Total** | **~1-2 minutes** |
| DNS propagation (first time) | 24-48 hours |

## 🎉 You're All Set!

Your site will now automatically deploy every time you push to GitHub. Just:

1. Make changes
2. Test locally with `npm start`
3. Commit: `git commit -m "Your message"`
4. Push: `git push origin main`
5. Wait 1-2 minutes
6. Visit your site!

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**Your Mind Bonanza site is now fully automated!** 🚀

Just push your changes and GitHub will handle the rest. Focus on creating great content!

