import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '../../../components/SiteHeader'
import { getPostBySlug, getAllPosts } from '../../../lib/posts'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const isPoetry = post.type === 'poetry'
  const bodyClass = `post-body ${isPoetry ? 'poetry' : 'prose'}`

  return (
    <div className="site-wrap">
      <SiteHeader />

      <article>
        <div className="post-header">
          <Link href="/blog" className="back-link">← all posts</Link>
          <div className={`type-badge type-${post.type}`} style={{ marginTop: 8 }}>
            {post.type}
          </div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">{formatDate(post.date)}</div>
        </div>

        <div
          className={bodyClass}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
