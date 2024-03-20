import './globals.css';
import Header from '../components/App/Header';
import {Toaster} from 'react-hot-toast';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
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
        <title>{serviceName}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <meta name="google-adsense-account" content="ca-pub-3009159750698563"></meta>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3009159750698563"
          crossOrigin="anonymous"></script>
      </head>

      <AuthProvider>
        <body className="flex flex-col bg-gradient-to-b from-white to-slate-200 min-h-screen">
            <Header/>
          
            {children}
            <Toaster position="bottom-right" toastOptions={{
              duration: 5000,
              style: {
                fontSize: '1.2rem'
              }
            }}/>

            <CookieNotice/>
            <Notice text={'Sovellus on työn alla. Pahoittelemme mahdollisista häiriöistä.'}/>
          </body>
      </AuthProvider>
        
    </html>
  )
}
