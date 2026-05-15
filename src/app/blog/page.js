import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import { getAllPosts } from '../../lib/posts'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export default function BlogPage({ searchParams }) {
  const filter = searchParams?.type || null
  const all = getAllPosts()
  const posts = filter ? all.filter(p => p.type === filter) : all
  const typeColors = { poetry: 'var(--red)', thought: 'var(--blue)', rant: 'var(--brown)', video: 'var(--green)' }

  return (
    <div className="site-wrap">
      <SiteHeader />
      <div className="blog-list">
        {posts.length === 0 && (
          <p style={{ fontStyle: 'italic', color: 'var(--muted)', padding: '40px 0' }}>
            Nothing here yet.
          </p>
        )}
        {posts.map(post => (
          <Link key={post.slug} href={`/p/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="blog-list-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: typeColors[post.type] || 'var(--muted)'
                  }}>
                    {post.type}
                  </span>
                </div>
                <h3>{post.title}</h3>
                {post.excerpt && <p>{post.excerpt}</p>}
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: 'var(--stain)',
                letterSpacing: 1,
                whiteSpace: 'nowrap'
              }}>
                {formatDate(post.date)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
