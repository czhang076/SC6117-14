import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MetaNotes - Intelligent Knowledge Base',
  description: 'Your personal intelligent knowledge base powered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Navbar />
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
