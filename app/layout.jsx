import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NORTH WINDS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>       
        
        <Header></Header>
        {children}
      
      <Footer></Footer>
      </body>
    </html>
  )
}
