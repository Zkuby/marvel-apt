import Gallery from '../../gallery';

const title = 'Apartamentų galerija | Marvel apartamentai';
const description = 'Šešios „Marvel“ apartamentų Kaune nuotraukos: svetainė, virtuvė, miegamasis, vonia, terasa ir fasadas.';

export const metadata = {
  title,
  description,
  openGraph: { title, description, locale: 'lt_LT', type: 'website' },
};

export default function Page() {
  return <Gallery locale="lt" />;
}
