import './globals.css'

export const metadata = {
  title: 'Link Drop',
  description: 'Share and discover links',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
