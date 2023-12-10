import { Providers } from "./providers"

export const metadata = {
  title: 'CORE dApp',
  description: 'Car générer des rendements au profit des oeuvres caritatives ne devrait pas faire rougir.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
