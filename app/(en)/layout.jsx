import Document from '../document';

export const metadata = {
  title: 'Marvel Apartments | A private stay in Kaunas',
  description: 'Private apartments for up to 8 guests in Kaunas. Two terraces overlooking the confluence of the Nemunas and Neris, a spacious living room and an enclosed courtyard.',
  openGraph: { title: 'Marvel Apartments | Kaunas', description: 'A private stay by the confluence of the Nemunas and Neris.', locale: 'en_GB', type: 'website' },
  icons: { icon: '/marvel.svg' },
};

export default function Layout({ children }) {
  return <Document locale="en">{children}</Document>;
}