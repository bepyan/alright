import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import Fonts from '~/components/Fonts';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
        />
        <title>오리이</title>
      </Head>
      <Fonts />
      <div className='font-sans'>
        <Component {...pageProps} />
      </div>
      <Toaster
        toastOptions={{
          position: 'top-center',
          duration: 3000,
          style: {
            fontSize: '14px',
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '40px',
            color: '#FFFFFF',
          },
        }}
      />
    </>
  );
}
