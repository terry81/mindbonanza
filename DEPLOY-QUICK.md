# 🚀 Quick Deployment Reference

## To Deploy Your Site:

```bash
git add .
git commit -m "Your change description"
git push origin main
```

**Done!** Your site deploys automatically in 1-2 minutes.

---

## Common Tasks

### Add a New Blog Post

```bash
# 1. Create the file
touch src/posts/my-new-post.md

# 2. Add content (see HOW-TO-POST.md)

# 3. Test locally
npm start
# Visit http://localhost:8080

# 4. Deploy
git add src/posts/my-new-post.md
git commit -m "Add new post: My Post Title"
git push origin main
```

### Update Styles

```bash
# 1. Edit CSS
nano src/css/main.css

# 2. Test locally
npm start

# 3. Deploy
git add src/css/main.css
git commit -m "Update homepage styling"
git push origin main
```

### Check Deployment Status

1. Go to your repository on GitHub
2. Click **Actions** tab
3. View latest workflow run
4. ✅ = Success, ❌ = Failed (check logs)

---

## URLs

**Local Development:** http://localhost:8080
**Live Site:** https://mindbonanza.com
**GitHub Pages:** https://[username].github.io/mindbonanza/

---

## Troubleshooting

### Build Fails?
```bash
# Test locally
npm run build

# Check for errors
# Fix them, then try again
```

### Site Not Updating?
- Wait 2 minutes
- Hard refresh browser (Cmd+Shift+R)
- Check Actions tab for errors

### Need Help?
- See `DEPLOYMENT-GUIDE.md` for details
- See `README-ELEVENTY.md` for complete docs
- See `HOW-TO-POST.md` for blog posts

---

**Remember:** Every push to `main` branch = automatic deployment! 🎉

