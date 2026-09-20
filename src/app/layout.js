import '../styles/globals.css'

export const metadata = {
  title: 'BUTTERFLYWEED',
  description: 'poems · thoughts · rants · films',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f5f0e8',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
