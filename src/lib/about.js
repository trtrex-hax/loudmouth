import fs from 'fs'
import path from 'path'

const aboutPath = path.join(process.cwd(), 'content/about.txt')

export function getAbout() {
  if (!fs.existsSync(aboutPath)) return ''
  return fs.readFileSync(aboutPath, 'utf8')
}