# LOUDMOUTH

Your personal blog. Poems, thoughts, rants, films.

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/loudmouth.git
cd loudmouth
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in:

| Variable | What it is |
|---|---|
| `ADMIN_PASSWORD` | Any password you choose for the `/admin` panel |
| `GITHUB_TOKEN` | A GitHub Personal Access Token with `repo` write scope |
| `GITHUB_OWNER` | Your GitHub username |
| `GITHUB_REPO` | This repo's name (e.g. `loudmouth`) |
| `GITHUB_BRANCH` | Usually `main` |

**To create a GitHub token:**
1. Go to github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → check `repo` scope → copy it

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Writing posts

### Option A: Admin panel (browser, anywhere)

Go to `/admin` on your live site. Log in with your `ADMIN_PASSWORD`. Write, preview, publish. The post commits to GitHub and Vercel auto-deploys in ~30 seconds.

### Option B: Markdown files (laptop)

Create a `.md` file in the `/posts` folder:

```
posts/my-poem-title.md
```

**Frontmatter** (top of the file):

```yaml
---
title: "My Poem Title"
date: "2026-05-15"
type: "poetry"           # poetry | thought | rant | video
excerpt: "Short description for the card on the homepage"
pullquote: "A striking line — shows on the hero card"
---
```

Then write your content below the `---`.

**For poetry:** spaces and line breaks are preserved *exactly* as you write them. Indent freely.

**For prose:** double line break = new paragraph.

Push to GitHub → Vercel deploys automatically.

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → import your repo
3. Add your environment variables in the Vercel dashboard (Settings → Environment Variables)
4. Deploy

Every push to `main` triggers a rebuild. Posts published via the admin panel push to `main` automatically.

---

## Site structure

```
/               → homepage (latest posts)
/blog           → all posts, filterable by type
/p/[slug]       → single post
/admin          → password-protected editor
```

## Post types

| Type | Badge color |
|---|---|
| `poetry` | Red |
| `thought` | Blue |
| `rant` | Brown |
| `video` | Green |
