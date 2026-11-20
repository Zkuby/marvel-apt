import Document from '../document';

export const metadata = {
  title: 'Marvel apartamentai | Privati viešnagė Kaune',
  description: 'Privatūs apartamentai iki 8 svečių Kaune. Dvi terasos su vaizdu į Nemuno ir Neries santaką, erdvi svetainė ir uždaras kiemas.',
  openGraph: { title: 'Marvel apartamentai | Kaunas', description: 'Privati viešnagė prie Nemuno ir Neries santakos.', locale: 'lt_LT', type: 'website' },
  icons: { icon: '/marvel.svg' },
};

export default function Layout({ children }) {
  return <Document locale="lt">{children}</Document>;
}