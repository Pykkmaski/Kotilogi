import './globals.css';
import Header from '../components/App/Header';
import {Toaster} from 'react-hot-toast';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { AuthProvider } from 'kotilogi-app/contexts/AuthProvider';
import Notice from 'kotilogi-app/components/App/Notice';

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

            <Notice text={'Sovellus on työn alla. Pahoittelemme mahdollisista häiriöistä.'}/>
          </body>
      </AuthProvider>
        
    </html>
  )
}
