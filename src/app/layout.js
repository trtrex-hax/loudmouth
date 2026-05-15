import '../styles/globals.css'

export const metadata = {
  title: 'LOUDMOUTH',
  description: 'poems · thoughts · rants · films',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
