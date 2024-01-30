import 'bootstrap/scss/bootstrap.scss';
import 'kotilogi-app/scss/main.scss';
import './globals.css';
import styles from './layout.module.scss';

import Header from './_Header/Header';
import Notice from 'kotilogi-app/components/Notice';
import {Toaster} from 'react-hot-toast';
import {AuthProvider} from '@/contexts/AuthProvider';

export const metadata = {
  title: 'Kotilogi',
  description: 'Talosi huoltokirja',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Kotilogi</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>

      <AuthProvider>
        <body className={styles.body}>
              <Header/>
              {children}
              <Notice text="Huomio! Sivusto on työn alla. Kaikki toiminnot eivät välttämättä toimi. Lisäämäsi sisältö ei välttämättä säily palvelussa!"/>
            
              <Toaster position="bottom-right" toastOptions={{
                duration: 5000,
                style: {
                  fontSize: '1.2rem'
                }
              }}/>
        </body>
      </AuthProvider>
    </html>
  )
}
