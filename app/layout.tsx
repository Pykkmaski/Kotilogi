import './globals.css';
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
        <body className="flex flex-col bg-gradient-to-b from-white to-slate-200 min-h-screen">
              <Header/>
            
              {children}
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
