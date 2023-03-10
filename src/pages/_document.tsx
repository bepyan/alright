import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function MyDocument() {
  return (
    <Html lang='ko' className='bg-white'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='w-full bg-zinc-50 font-sans text-slate-900 antialiased'>
        <div className='container min-h-screen bg-white font-sans'>
          <Main />
        </div>
        <NextScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
          strategy='beforeInteractive'
        />
      </body>
    </Html>
  );
}
