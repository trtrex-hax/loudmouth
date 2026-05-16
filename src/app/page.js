import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'
import { getAllPosts } from '../lib/posts'
import { getAbout } from '../lib/about'

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

function getDailyHero(posts) {
  if (!posts.length) return null
  const day = Math.floor(Date.now() / 86400000)
  return posts[day % posts.length]
}

export default function HomePage() {
  const allPosts = getAllPosts()
  const about = getAbout()

  const hero = getDailyHero(allPosts)
  const rest = allPosts.filter(p => p.slug !== hero?.slug)
  const recent = rest.slice(0, 9)
  const recentPoems = allPosts.filter(p => p.type === 'poetry').slice(0, 5)

  return (
    <div className="site-wrap">
      <SiteHeader />

      <div className="post-grid">
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

      <div className="bottom-strip">
        <div className="strip-recent">
          <div className="strip-label">Recent poems</div>
          <ul className="recent-list">
            {recentPoems.length === 0 && (
              <li style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: 13 }}>No poems yet.</li>
            )}
            {recentPoems.map(p => (
              <li key={p.slug}>
                <Link href={`/p/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <span className="recent-title">{p.title}</span>
                </Link>
                <span className="recent-meta">{formatDate(p.date)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="strip-about">
          <div className="strip-label">Who is this</div>
          <p className="about-text">{about || 'A person writing through things.'}</p>
          <div className="about-sig">Jedidiah.</div>
        </div>
      </div>
    </div>
  )
}