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


# BUTTERFLYWEED — How This Site Works

---

## The basics

Your site has two sides:

- **Public side** — what everyone sees at your URL
- **Admin side** — only you, at `/admin`

Every time you add or change something and push to GitHub, Vercel detects it and rebuilds the site automatically. Takes about 30 seconds.

---

## Writing a post

Every post is a `.md` file inside the `/posts` folder on your computer.

### File naming
Name the file whatever you want the URL slug to be:
```
posts/maame-wata.md        → yoursite.com/p/maame-wata
posts/indomie.md           → yoursite.com/p/indomie
posts/on-grief.md          → yoursite.com/p/on-grief
```
Use lowercase, hyphens instead of spaces, no special characters.

---

## Frontmatter

Every post starts with a block called frontmatter — metadata between two `---` lines. This is required.

```md
---
title: "Your Post Title"
date: "2026-05-15"
type: "poetry"
excerpt: "Short description that shows on the homepage card."
pullquote: "A striking line — shows on the hero card if this is the latest post."
---

Your content starts here.
```

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Always in quotes |
| `date` | Yes | Format: `"YYYY-MM-DD"` e.g. `"2026-05-15"` |
| `type` | Yes | Must be exactly one of the four types below |
| `excerpt` | No | Shows on homepage cards and the blog list |
| `pullquote` | No | Shows on the hero card if this post is the latest |

---

## Post types

The `type` field must be **exactly** one of these, lowercase, in quotes:

| Type | What it's for | Badge colour |
|---|---|---|
| `"poetry"` | Poems | Red |
| `"thought"` | Essays, reflections, observations | Blue |
| `"rant"` | Exactly what it sounds like | Brown |
| `"video"` | Video posts | Green |

**Important:** `"Poem"`, `"Poetry"`, `"POETRY"` will all break the build. Must be lowercase.

---

## Poetry formatting

For `type: "poetry"`, your spacing and line breaks are preserved **exactly** as you write them. Indent freely.

```md
---
title: "little eggshell boy"
date: "2026-05-01"
type: "poetry"
---

        i have been
              carried

carefully,
        yes —

but carried
the way you carry
        something
              you are not sure
                    will survive the trip.
```

What you type is what the reader sees. No reformatting happens.

---

## Prose formatting

For `thought` and `rant` posts, double line break = new paragraph.

```md
---
title: "On explaining poems"
date: "2026-05-10"
type: "rant"
---

First paragraph goes here. It can be as long as you want.

Second paragraph starts after a blank line.

And so on.
```

---

## Publishing workflow

### From your laptop (markdown files)

1. Create a `.md` file in `/posts`
2. Write your frontmatter and content
3. Save the file
4. Run in your terminal:
```bash
git add .
git commit -m "add: post title"
git push
```
5. Vercel rebuilds. Live in ~30 seconds.

### From the admin panel (browser, anywhere)

1. Go to `yoursite.com/admin`
2. Enter your `ADMIN_PASSWORD`
3. Fill in the fields — title, type, date, excerpt, pullquote
4. Write your post in the text area
5. Switch to **Preview** tab to check how it looks
6. Click **Publish**
7. The post commits to GitHub automatically. Live in ~30 seconds.

---

## The homepage

The **most recent post** (by date) always becomes the hero — the big feature at the top. Its `pullquote` field shows in the right panel of the hero card.

The next four most recent posts show as grid cards below it.

---

## The blog list

`/blog` shows all posts, newest first.

The nav filters by type:
- All
- Poetry
- Thoughts
- Rants
- Video

---

## Common mistakes that break the build

| Mistake | Fix |
|---|---|
| `type: "Poem"` | Use `type: "poetry"` |
| Missing `---` around frontmatter | Add opening and closing `---` |
| Date as `"15-05-2026"` | Use `"2026-05-15"` |
| Unmatched quote in title | Escape it: `title: "it\\'s fine"` or use single quotes inside |
| Forgetting to push after saving | Run `git add . && git commit -m "msg" && git push` |

---

## Environment variables (don't touch these unless something breaks)

Stored in Vercel under Settings → Environment Variables:

| Variable | What it does |
|---|---|
| `ADMIN_PASSWORD` | Password for `/admin` |
| `GITHUB_TOKEN` | Lets the admin panel commit posts to GitHub |
| `GITHUB_OWNER` | Your GitHub username |
| `GITHUB_REPO` | The repo name (`loudmouth`) |
| `GITHUB_BRANCH` | The branch (`main`) |

If you generate a new GitHub token, update `GITHUB_TOKEN` in Vercel and redeploy.

---

## Site structure

```
/                   → homepage
/blog               → all posts, filterable
/p/[slug]           → single post
/admin              → your editor (password protected)
```

---

## If something breaks

1. Go to vercel.com → your project → Deployments
2. Click the failed deployment
3. Read the red error text — it usually tells you exactly which file and what's wrong
4. Fix it, push, and Vercel retries automatically

