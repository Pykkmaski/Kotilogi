import 'bootstrap/scss/bootstrap.scss';
import 'kotilogi-app/scss/main.scss';
import './globals.scss';
import styles from './layout.module.scss';

import Header from './_Header/Header';
import Notice from 'kotilogi-app/src/Components/Notice';
import AuthProvider from 'kotilogi-app/contexts/AuthProvider';

export const metadata = {
  title: 'Kotilogi',
  description: 'Talosi huoltokirja',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
          <div className={styles.container}>
              <AuthProvider>
                <Header/>
                {children}
                <Notice text="Huomio! Sivu on työn alla, joten siinä saattaa esiintyä virheitä"/>
              </AuthProvider>
          </div>
      </body>
    </html>
  )
}
