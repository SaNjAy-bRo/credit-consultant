import type { Metadata } from 'next';
import { Root } from './components/Root';
import '../styles/index.css';

export const metadata: Metadata = {
  title: 'Credit Consultant — Live life debt free | India\'s #1 Credit Repair',
  description: 'Expert credit repair, CIBIL score improvement, score dispute resolution, and loan advisory services across India. Free consultation.',
  metadataBase: new URL('https://creditconsultant.in'),
  keywords: ['credit repair', 'cibil score improvement', 'cibil dispute', 'credit consultant india'],
  openGraph: {
    title: 'Credit Consultant — Live life debt free',
    description: 'India\'s leading credit repair & loan advisory team. Over 50,000+ reports processed.',
    url: 'https://creditconsultant.in',
    siteName: 'Credit Consultant',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Consultant — Live life debt free',
    description: 'India\'s leading credit repair & loan advisory team.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-white text-slate-900">
        <Root>{children}</Root>
      </body>
    </html>
  );
}
