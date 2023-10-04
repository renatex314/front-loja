import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet='UTF-8' />
        <title>Front-end loja</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
