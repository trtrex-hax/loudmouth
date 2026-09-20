'use client'

import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkHtml from 'remark-html'
import TurndownService from 'turndown'
import { gfm as turndownGfm } from 'turndown-plugin-gfm'

let turndownService = null

function getTurndown() {
  if (turndownService) return turndownService
  turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '_',
  })
  turndownService.use(turndownGfm)

  // Word/Google Docs wrap paragraphs in empty <o:p></o:p> and MsoNormal spans —
  // drop anything that renders as pure whitespace so pasted docs don't leave stray gaps.
  turndownService.addRule('dropEmptyMsoNodes', {
    filter: node => /^o:p$/i.test(node.nodeName) && !node.textContent.trim(),
    replacement: () => '',
  })

  return turndownService
}

// Converts rich HTML (pasted from Word, Google Docs, a browser, etc.) into
// Markdown equivalent to what this site's post renderer expects.
export function htmlToMarkdown(html) {
  return getTurndown().turndown(html).trim()
}

// Renders Markdown to HTML the same way a published post is rendered,
// so the admin preview matches reality (including tables/strikethrough via GFM).
export function markdownToHtml(markdown) {
  const file = remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkHtml, { sanitize: false })
    .processSync(markdown || '')
  return String(file)
}
