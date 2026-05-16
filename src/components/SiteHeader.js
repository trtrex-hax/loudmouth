'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TYPES = [
  { label: 'All', value: null },
  { label: 'Poetry', value: 'poetry' },
  { label: 'Thoughts', value: 'thought' },
  { label: 'Rants', value: 'rant' },
  { label: 'Video', value: 'video' },
]

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
        {TYPES.map(({ label, value }) => {
          const href = value ? `/blog?type=${value}` : '/blog'
          const isActive = path === '/blog' && !value
          return (
            <Link key={label} href={href} className={isActive ? 'active' : ''}>
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}