import localFont from '@next/font/local';

const fontSans = localFont({
  variable: '--font-sans',
  src: [
    {
      path: '../assets/fonts/NotoSansKR-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NotoSansKR-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NotoSansKR-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function Fonts() {
  return (
    <style jsx global>{`
      :root {
        --font-sans: ${fontSans.style.fontFamily};
      }
    `}</style>
  );
}
