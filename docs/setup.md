# 📖 Setup Guide

> Step-by-step instructions to fork, customize, and deploy your GitHub Profile README.

---

## Prerequisites

- A [GitHub account](https://github.com/)
- [Node.js](https://nodejs.org/) v18+ (for running scripts locally)
- [Git](https://git-scm.com/) installed

---

## Step 1 — Fork or Clone This Repository

### Option A: Use as a Template

1. Click **"Use this template"** at the top of the repository page.
2. Name the new repository **exactly** as your GitHub username (e.g., `Praveenmanoharand`).
3. Set visibility to **Public**.

### Option B: Clone Manually

```bash
git clone https://github.com/Praveenmanoharand/github-profile.git Praveenmanoharand
cd Praveenmanoharand
```

> **⚠️ Important:** For GitHub to render this as your profile README, the repository name **must match your GitHub username exactly**, and it **must be public**.

---

## Step 2 — Replace Placeholders

Search and replace the following placeholders across all files:

| Placeholder               | Replace With                        |
|---------------------------|-------------------------------------|
| `Praveenmanoharand`            | Your GitHub username                |
| `Your Name`              | Your actual name                    |
| `your.email@example.com` | Your email address                  |
| `yourportfolio.dev`      | Your portfolio URL                  |
| `yourinvite`             | Your Discord invite code            |
| `yourid`                 | Your Stack Overflow user ID         |
| `project-alpha`          | Your actual repository names        |
| `ml-pipeline`            | Your actual repository names        |
| `mobile-app`             | Your actual repository names        |
| `cli-toolkit`            | Your actual repository names        |

### Quick Replace (All Files)

```bash
# Linux/macOS
find . -type f -name "*.md" -exec sed -i 's/Praveenmanoharand/ACTUAL_USERNAME/g' {} +

# Windows PowerShell
Get-ChildItem -Recurse -Filter *.md | ForEach-Object {
  (Get-Content $_.FullName) -replace 'Praveenmanoharand', 'ACTUAL_USERNAME' | Set-Content $_.FullName
}
```

---

## Step 3 — Enable GitHub Actions

1. Go to your repository → **Settings** → **Actions** → **General**.
2. Under "Workflow permissions", select **Read and write permissions**.
3. Check **Allow GitHub Actions to create and approve pull requests**.
4. Click **Save**.

---

## Step 4 — Add Secrets (for Metrics)

The `metrics.yml` workflow requires a Personal Access Token:

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta).
2. Create a new token with the following permissions:
   - **Repository**: Read-only access to your profile repo
   - **Account**: Read-only access to your profile data
3. Copy the token.
4. Go to your repository → **Settings** → **Secrets and variables** → **Actions**.
5. Click **New repository secret**.
6. Name: `METRICS_TOKEN`, Value: paste your token.

---

## Step 5 — Customize Components

Edit files in the `/components` directory to personalize each section:

| File                | Purpose                                      |
|---------------------|----------------------------------------------|
| `hero.md`           | Header banner, typing animation, badges      |
| `about.md`          | Bio, highlights, personal details            |
| `tech-stack.md`     | Add/remove skill badges                      |
| `stats.md`          | GitHub stats cards configuration              |
| `projects.md`       | Featured projects and descriptions           |
| `achievements.md`   | Certifications and trophies                  |
| `quote.md`          | Dev quote widget                             |
| `contact.md`        | Social media links                           |
| `footer.md`         | Footer message and visitor counter           |

See [customization.md](./customization.md) for detailed theming options.

---

## Step 6 — Build README Locally (Optional)

```bash
# Install dependencies (if any are added later)
npm install

# Compose README.md from components
node scripts/update-stats.js

# Generate custom banners
node scripts/generate-banner.js --text "Your Name" --type hero
```

---

## Step 7 — Push and Deploy

```bash
git add .
git commit -m "🚀 Personalize GitHub profile README"
git push origin main
```

The GitHub Actions workflows will automatically:
- ✅ Generate the contribution snake animation
- ✅ Generate metrics SVG cards
- ✅ Compose README.md from components

---

## Troubleshooting

| Issue                         | Solution                                          |
|-------------------------------|---------------------------------------------------|
| README not showing on profile | Repo must be named as your username and be public  |
| Snake not generating          | Check Actions tab for errors; verify permissions   |
| Metrics failing               | Ensure `METRICS_TOKEN` secret is set correctly     |
| Stats cards not loading       | Verify your username in component URLs             |

---

## Need Help?

Open an [issue](https://github.com/Praveenmanoharand/Praveenmanoharand/issues) and we'll help you get set up!
