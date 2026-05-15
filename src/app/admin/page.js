'use client'
import { useState } from 'react'

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function buildFrontmatter({ title, date, type, excerpt, pullquote }) {
  const lines = [
    `title: "${title}"`,
    `date: "${date}"`,
    `type: "${type}"`,
  ]
  if (excerpt) lines.push(`excerpt: "${excerpt}"`)
  if (pullquote) lines.push(`pullquote: "${pullquote}"`)
  return lines.join('\n')
}

function PreviewBody({ type, body }) {
  if (!body) return <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Your post will appear here...</p>
  if (type === 'poetry') {
    return <pre style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 17, lineHeight: 1.85, whiteSpace: 'pre-wrap', color: 'var(--ink)' }}>{body}</pre>
  }
  return body.split('\n\n').map((para, i) => (
    <p key={i} style={{ fontSize: 16, lineHeight: 1.8, marginBottom: '1.2em', color: 'var(--ink)' }}>{para}</p>
  ))
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)

  const [title, setTitle] = useState('')
  const [type, setType] = useState('poetry')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [excerpt, setExcerpt] = useState('')
  const [pullquote, setPullquote] = useState('')
  const [body, setBody] = useState('')
  const [customSlug, setCustomSlug] = useState('')

  const [status, setStatus] = useState(null) // null | 'loading' | 'ok' | 'err'
  const [statusMsg, setStatusMsg] = useState('')
  const [tab, setTab] = useState('write') // 'write' | 'preview'

  function handleLogin(e) {
    e.preventDefault()
    // Client-side: we'll let the API reject wrong passwords
    // Just check it's non-empty
    if (!pw.trim()) { setPwErr(true); return }
    setAuthed(true)
  }

  async function handlePublish() {
    if (!title || !body) {
      setStatus('err'); setStatusMsg('Title and body are required.'); return
    }
    const slug = customSlug || slugify(title)
    const frontmatter = buildFrontmatter({ title, date, type, excerpt, pullquote })
    setStatus('loading'); setStatusMsg('Publishing...')

    try {
      const res = await fetch('/api/save-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw, slug, frontmatter, body })
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('err'); setStatusMsg(data.error || 'Something went wrong.')
      } else {
        setStatus('ok'); setStatusMsg(`Published! /p/${slug} will be live in ~30s.`)
      }
    } catch (e) {
      setStatus('err'); setStatusMsg('Network error.')
    }
  }

  if (!authed) return (
    <div className="login-wrap" style={{ background: 'var(--paper)', position: 'relative', zIndex: 1 }}>
      <div className="login-box">
        <div className="login-title">ADMIN</div>
        <div className="login-sub">loudmouth</div>
        <form onSubmit={handleLogin}>
          <div className="admin-field">
            <label className="admin-label">Password</label>
            <input
              type="password"
              className="admin-input"
              value={pw}
              onChange={e => { setPw(e.target.value); setPwErr(false) }}
              placeholder="••••••••"
              autoFocus
            />
            {pwErr && <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--red)' }}>Enter a password</span>}
          </div>
          <button type="submit" className="admin-btn" style={{ width: '100%' }}>Enter</button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        New Post
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2, color: 'var(--muted)', marginLeft: 20, fontWeight: 400 }}>
          LOUDMOUTH ADMIN
        </span>
      </div>

      {/* META FIELDS */}
      <div className="admin-grid" style={{ marginBottom: 20 }}>
        <div>
          <div className="admin-field">
            <label className="admin-label">Title</label>
            <input className="admin-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Excerpt (optional)</label>
            <input className="admin-input" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short description for the card" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Pull quote (optional — for hero card)</label>
            <input className="admin-input" value={pullquote} onChange={e => setPullquote(e.target.value)} placeholder="A striking line from the piece" />
          </div>
        </div>
        <div>
          <div className="admin-field">
            <label className="admin-label">Type</label>
            <select className="admin-select" value={type} onChange={e => setType(e.target.value)}>
              <option value="poetry">Poetry</option>
              <option value="thought">Thought</option>
              <option value="rant">Rant</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="admin-field">
            <label className="admin-label">Date</label>
            <input type="date" className="admin-input" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Slug (optional — auto-generated from title)</label>
            <input className="admin-input" value={customSlug} onChange={e => setCustomSlug(e.target.value)} placeholder={slugify(title) || 'my-post-slug'} />
          </div>
        </div>
      </div>

      {/* WRITE / PREVIEW TABS */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 0, borderBottom: '1.5px solid var(--ink)' }}>
        {['write', 'preview'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: 'uppercase',
              padding: '8px 20px',
              border: 'none',
              borderRight: '1px solid var(--stain)',
              background: tab === t ? 'var(--ink)' : 'transparent',
              color: tab === t ? 'var(--paper)' : 'var(--ink)',
              cursor: 'pointer'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'write' ? (
        <div className="admin-field" style={{ marginTop: 0 }}>
          <textarea
            className="admin-textarea"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder={type === 'poetry'
              ? "Write your poem here.\n\nSpacing and line breaks are preserved exactly as you type them.\n\n        indent like this\nbreak\n    wherever\n          you want."
              : "Write your post here.\n\nDouble line break = new paragraph."
            }
            spellCheck={false}
          />
        </div>
      ) : (
        <div className="preview-pane" style={{ marginTop: 0 }}>
          <div className="preview-title">Preview — {type}</div>
          {title && <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 28, fontWeight: 300, fontStyle: 'italic', marginBottom: 20 }}>{title}</h2>}
          <PreviewBody type={type} body={body} />
        </div>
      )}

      {/* PUBLISH */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
        <button className="admin-btn" onClick={handlePublish} disabled={status === 'loading'}>
          {status === 'loading' ? 'Publishing...' : 'Publish →'}
        </button>
        <a href="/" className="admin-btn secondary" style={{ display: 'inline-block', textAlign: 'center' }}>← View Site</a>
      </div>

      {status && (
        <div className={`status-msg status-${status === 'loading' ? 'loading' : status}`}>
          {statusMsg}
        </div>
      )}
    </div>
  )
}
