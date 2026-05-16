import { NextResponse } from 'next/server'

export async function POST(req) {
  const { password, content } = await req.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const {
    GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH = 'main'
  } = process.env

  const filename = 'content/about.txt'
  const encoded = Buffer.from(content).toString('base64')

  let sha
  try {
    const check = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filename}?ref=${GITHUB_BRANCH}`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
    )
    if (check.ok) {
      const data = await check.json()
      sha = data.sha
    }
  } catch (_) {}

  const body_payload = {
    message: 'update: about text',
    content: encoded,
    branch: GITHUB_BRANCH,
    ...(sha ? { sha } : {})
  }

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filename}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body_payload)
    }
  )

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message }, { status: res.status })
  }

  return NextResponse.json({ ok: true })
}