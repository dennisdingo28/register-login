import './globals.css'

export const metadata = {
  title: 'Register/Login Next Auth',
  description: 'Authentication application with next auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
    </head>
      <body className='font-geologica'>
        {children}
      </body>
    </html>
  )
}
