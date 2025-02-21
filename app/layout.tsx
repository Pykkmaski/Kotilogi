import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from 'kotilogi-app/contexts/AuthProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from '@mui/material';
import { theme } from 'kotilogi-app/muiTheme';
import { AppProvider } from 'kotilogi-app/contexts/AppProvider';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { ReactQueryProvider } from './ReactQueryProvider';
import { VPCookieNotice } from '@/components/App/CookieNotice/VPCookieNotice';

export const metadata = {
  title: 'Kotidok: Talosi digitaalinen huoltokirja ',
  description: 'Verkkopalvelu, johon talon huoltotiedot tallentuvat helposti samaan paikkaan.',
};

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const bodyClassName = ['flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200'];
  const analyticsCookie = (await cookies()).get('kotidok-analytics-accepted');
  const getAnalyticsScript = () =>
    //Only use analytics in production.
    process.env.NODE_ENV === 'production' &&
    analyticsCookie?.value == 'all' && (
      <>
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-RKZTMRLF2J'></Script>

        <Script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RKZTMRLF2J');
`,
          }}
        />
      </>
    );

  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'></link>

        {getAnalyticsScript()}
      </head>

      <AppRouterCacheProvider>
        <AuthProvider>
          <ReactQueryProvider>
            <body className={bodyClassName.join(' ')}>
              <Script
                async
                src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3009159750698563'
                crossOrigin='anonymous'></Script>
              <ThemeProvider theme={theme}>
                <AppProvider>{children}</AppProvider>
                {/*<VPCookieNotice />*/}
              </ThemeProvider>
              <VPCookieNotice />
              <Toaster
                position='bottom-right'
                toastOptions={{
                  duration: 5000,
                  style: {
                    fontSize: '1.2rem',
                  },
                }}
              />
            </body>
          </ReactQueryProvider>
        </AuthProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
