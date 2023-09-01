import 'bootstrap/scss/bootstrap.scss';
import 'kotilogi-app/scss/main.scss';
import './globals.scss';
import styles from './layout.module.scss';

import Header from './_Header/Header';
import Notice from 'kotilogi-app/components/Notice';
import AuthProvider from 'kotilogi-app/contexts/AuthProvider';
import {Toaster} from 'react-hot-toast';

export const metadata = {
  title: 'Kotilogi',
  description: 'Talosi huoltokirja',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={styles.body}>
          <Header/>
          <div className={styles.container}>
                {children}
                <Notice text="Huomio! Sivusto on työn alla, joten siinä saattaa esiintyä virheitä. Lisäämäsi sisältö ei säily palvelussa!"/>
              
              <Toaster position="bottom-right" toastOptions={{
                duration: 5000,
                style: {
                  fontSize: '1.2rem'
                }
              }}/>
          </div>
      </body>
      </AuthProvider>
    </html>
  )
}
