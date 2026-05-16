import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkBreaks from 'remark-breaks'

const postsDir = path.join(process.cwd(), 'posts')

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getPostBySlug(slug) {
  const filepath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)

  if (data.type === 'poetry') {
    return { slug, ...data, content, raw: true }
  }

  const processed = await remark()
    .use(remarkBreaks)
    .use(remarkHtml, { sanitize: false })
    .process(content)
  return { slug, ...data, content: processed.toString(), raw: false }
}