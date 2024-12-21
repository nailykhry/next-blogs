import localFont from 'next/font/local';
import './globals.css';
import SessionWrapper from './components/SessionWrapper';
import { NotificationProvider } from '@/app/context/NotificationContext';


const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'InkSpire',
  description: 'Naily Blogs',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
