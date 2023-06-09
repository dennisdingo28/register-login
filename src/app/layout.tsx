import Provider from '@/components/Provider'
import type {Session} from "next-auth"
import './globals.css'

export const metadata = {
  title: 'Register/Login Next Auth',
  description: 'Authentication application with next auth',
}

export default function RootLayout({
  children,session
}: {
  children: React.ReactNode,
  session: Session
}) {

  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
    </head>
      <body className='font-geologica'>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
