import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GVTCards - AI-Powered Flashcard Generator',
  description: 'The easiest way to enhance your knowledge from just a simple text. Create AI-powered flashcards instantly with GVTCards.',
  keywords: ['flashcards', 'AI', 'learning', 'education', 'study', 'OpenAI', 'SaaS'],
  authors: [{ name: 'GVT Team' }],
  openGraph: {
    title: 'GVTCards - AI-Powered Flashcard Generator',
    description: 'The easiest way to enhance your knowledge from just a simple text.',
    type: 'website',
  },
}

/**
 * Root layout component for the application
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
