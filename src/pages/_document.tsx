import { Head, Html, Main, NextScript } from 'next/document';

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
        <div className='container min-h-screen bg-white'>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
