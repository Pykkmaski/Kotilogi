import './globals.css';
import Header from './_Header/Header';
import Notice from 'kotilogi-app/components/Notice';
import {Toaster} from 'react-hot-toast';
import {AuthProvider} from '@/contexts/AuthProvider';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { AppContextProvider } from './AppContext';

export const metadata = {
  title: 'Kotilogi',
  description: 'Talosi huoltokirja',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession(options) as {user: {email: string}};

  return (
    <html lang="en">
      <head>
        <title>Kotilogi</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>

      <AppContextProvider value={{session}}>
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
      </AppContextProvider>
        
    </html>
  )
}
