import './globals.css';
import {Toaster} from 'react-hot-toast';
import { AuthProvider } from 'kotilogi-app/contexts/AuthProvider';
import Notice from 'kotilogi-app/components/App/Notice';
import { serviceName } from 'kotilogi-app/constants';
import { CookieNotice } from '@/components/App/CookieNotice';

export const metadata = {
  title: 'Kotidok',
  description: 'Talosi huoltokirja',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3009159750698563"
          crossOrigin="anonymous"></script>
      </head>

      <AuthProvider>
        <body className="flex flex-col bg-gradient-to-b from-white to-slate-200 min-h-screen">
            {children}
            <Toaster position="bottom-right" toastOptions={{
              duration: 5000,
              style: {
                fontSize: '1.2rem'
              }
            }}/>

            <CookieNotice/>
            <div className="md:hidden xs:block">
              <Notice text={'Sovelluksen mobiiliversio on työn alla! Kokeile uudelleen myöhemmin.'}/>
            </div>
            
          </body>
      </AuthProvider>
        
    </html>
  )
}
