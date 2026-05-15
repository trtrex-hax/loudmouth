import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'
import { getAllPosts } from '../lib/posts'

function TypeBadge({ type }) {
  const icons = { poetry: '✦', thought: '◈', rant: '▲', video: '▶' }
  return (
    <div className={`type-badge type-${type}`}>
      {icons[type] || '·'} {type}
    </div>
  )
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export default function HomePage() {
  const posts = getAllPosts()
  const [hero, ...rest] = posts
  const recent = rest.slice(0, 4)

  return (
    <div className="site-wrap">
      <SiteHeader />

      <div className="post-grid">
        {/* HERO */}
        {hero && (
          <Link href={`/p/${hero.slug}`} style={{ textDecoration: 'none', gridColumn: '1/-1' }}>
            <div className="hero-card">
              <div className="hero-text">
                <div className="feature-label">Feature</div>
                <h2>{hero.title}</h2>
                {hero.excerpt && <p className="hero-excerpt">{hero.excerpt}</p>}
                <div className="hero-meta">
                  {hero.type} · {formatDate(hero.date)}
                </div>
              </div>
              <div className="hero-stamp">
                {hero.pullquote
                  ? <>
                      <div className="pullquote">"{hero.pullquote}"</div>
                      <div className="pullquote-attr">— from {hero.title}</div>
                    </>
                  : <div className="pullquote" style={{ opacity: 0.5 }}>read →</div>
                }
              </div>
            </div>
          </Link>
        )}

        {/* GRID CARDS */}
        {recent.map(post => (
          <Link key={post.slug} href={`/p/${post.slug}`} style={{ textDecoration: 'none' }}>
            <div className="post-card">
              <TypeBadge type={post.type} />
              <h2>{post.title}</h2>
              {post.excerpt && <p>{post.excerpt}</p>}
              <div className="card-date">{formatDate(post.date)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
