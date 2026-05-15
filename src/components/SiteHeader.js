'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TYPES = ['All', 'Poetry', 'Thoughts', 'Rants', 'Video']

export default function SiteHeader() {
  const path = usePathname()
  const year = new Date().getFullYear()

  return (
    <>
      <header className="site-header">
        <div className="header-top">
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div className="masthead">BUTTERFLYWEED</div>
            </Link>
            <div className="masthead-sub">poems · thoughts · rants · films</div>
          </div>
          <div className="issue-block">
            <strong>Vol. 1</strong>
            EST. {year}<br />
            ACCRA, GH<br />
            CAMEL.LION.CHILD
          </div>
        </div>
      </header>
      <nav className="site-nav">
        {TYPES.map(t => {
          const href = t === 'All' ? '/blog' : `/blog?type=${t.toLowerCase()}`
          const isActive = path === '/blog' && t === 'All'
          return (
            <Link key={t} href={href} className={isActive ? 'active' : ''}>
              {t}
            </Link>
          )
        })}
      </nav>
    </>
  )
}