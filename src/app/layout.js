import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: '500' })

export const metadata = {
  title: 'MyEntertainList',
  description: 'Explore and share your favorite Movies and Shows.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
