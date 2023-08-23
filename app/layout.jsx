"use static";
import 'bootstrap/scss/bootstrap.scss';
import 'kotilogi-app/scss/main.scss';
import styles from './layout.module.scss';

import Header from './_Header/Header';
import Notice from 'kotilogi-app/src/Components/Notice';

export const metadata = {
  title: 'Kotilogi',
  description: 'Talosi huoltokirja',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={styles.body}>
          <div className={styles.container}>
              <Header/>
                {children}
              <Notice text="Huomio! Sivu on työn alla, joten siinä saattaa esiintyä virheitä"/>
          </div>
      </body>
    </html>
  )
}
