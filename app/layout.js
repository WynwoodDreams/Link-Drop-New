import './globals.css'

export const metadata = {
  title: 'Link Drop - Learning Hub',
  description: 'Share, discover, and organize links for learning',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
