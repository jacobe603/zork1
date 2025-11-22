# GitHub Pages Setup Guide

This repository is configured to be hosted on GitHub Pages!

## 🚀 Quick Setup

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/jacobe603/zork1`
2. Click **Settings** (top right)
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/docs`
5. Click **Save**

### Step 2: Wait for Deployment

GitHub Pages will automatically build and deploy your site. This takes 1-2 minutes.

You'll see a message: "Your site is published at `https://jacobe603.github.io/zork1/`"

### Step 3: Visit Your Site

Once deployed, visit: **https://jacobe603.github.io/zork1/**

You should see the landing page with a "PLAY NOW" button!

## 📁 Repository Structure

```
/
├── index.html           - Landing page (redirects to game)
├── docs/                - GitHub Pages source (served publicly)
│   ├── index.html      - Main game interface
│   ├── game.js         - Game engine
│   ├── style.css       - Styling
│   ├── README.md       - Documentation
│   └── INSTRUCTIONS.md - How to play
├── demo/                - Original demo folder (same content as docs/)
└── *.zil                - Original ZIL source files
```

## 🔧 Alternative Configurations

### Option A: Serve from Root
If you prefer to serve from the repository root:
1. Move `docs/*` files to root
2. In GitHub Pages settings, select **Folder**: `/ (root)`

### Option B: Use Custom Domain
1. In GitHub Pages settings, add your custom domain
2. Create a `CNAME` file in `/docs` with your domain name
3. Configure DNS with your domain registrar

### Option C: Use gh-pages Branch
1. Create a new branch called `gh-pages`
2. Push only the web files to that branch
3. In settings, select **Branch**: `gh-pages`

## 🎮 Direct Links (After Setup)

- **Landing Page**: `https://jacobe603.github.io/zork1/`
- **Play Game**: `https://jacobe603.github.io/zork1/docs/`
- **Documentation**: `https://jacobe603.github.io/zork1/docs/README.md`

## 🔄 Updating the Site

Any changes pushed to the configured branch/folder will automatically rebuild the site:

```bash
# Make changes to files in /docs
git add docs/
git commit -m "Update game"
git push

# Site updates automatically in 1-2 minutes
```

## 🎨 Adding Images

To add scene images to your GitHub Pages site:

1. Create an `images/` folder in `/docs`:
   ```bash
   mkdir docs/images
   ```

2. Add your images:
   ```bash
   cp west-of-house.jpg docs/images/
   cp forest.jpg docs/images/
   ```

3. Update CSS in `docs/style.css` to reference images:
   ```css
   .scene-image[data-room="westOfHouse"] {
       background-image: url('images/west-of-house.jpg');
       background-size: cover;
   }
   ```

4. Commit and push:
   ```bash
   git add docs/images docs/style.css
   git commit -m "Add scene images"
   git push
   ```

## 📊 Checking Deployment Status

1. Go to **Actions** tab on GitHub
2. You'll see workflow runs for "pages build and deployment"
3. Green checkmark = successfully deployed
4. Click on a run to see deployment details

## 🐛 Troubleshooting

**Site not appearing?**
- Check that GitHub Pages is enabled in Settings
- Verify the correct branch/folder is selected
- Wait 2-3 minutes after first setup
- Check Actions tab for deployment errors

**404 errors?**
- Ensure `index.html` exists in the selected folder
- Check file paths are correct (case-sensitive on Linux)
- Verify files were committed and pushed

**Images not loading?**
- Use relative paths (e.g., `images/scene.jpg` not `/images/scene.jpg`)
- Ensure images are in the `/docs` folder
- Check file extensions match (case-sensitive)

## 🌐 Sharing Your Game

Once deployed, share these links:
- Landing page: `https://jacobe603.github.io/zork1/`
- Direct to game: `https://jacobe603.github.io/zork1/docs/`

## 🔒 Private Repositories

Note: GitHub Pages is available for:
- ✅ Public repositories (free)
- ✅ Private repositories (requires GitHub Pro, Team, or Enterprise)

If your repo is private and you don't have a paid plan, you'll need to make it public to use GitHub Pages.

## 📝 Custom Landing Page

The `index.html` in the root provides a nice landing page. You can customize:
- Title and description
- Feature list
- Links
- Styling (all CSS is inline)

## ✅ Verification Checklist

- [ ] GitHub Pages enabled in Settings → Pages
- [ ] Source set to correct branch and `/docs` folder
- [ ] `index.html` exists in `/docs`
- [ ] Changes committed and pushed
- [ ] Waited 2-3 minutes for deployment
- [ ] Site loads at `https://jacobe603.github.io/zork1/`
- [ ] Game is playable

---

**Ready to enable GitHub Pages?** Follow Step 1 above!
