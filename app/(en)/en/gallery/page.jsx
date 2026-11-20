import Gallery from '../../../gallery';

const title = 'Apartment gallery | Marvel Apartments';
const description = 'Six photos of Marvel Apartments in Kaunas: living room, kitchen, bedroom, bathroom, terrace and façade.';

export const metadata = {
  title,
  description,
  openGraph: { title, description, locale: 'en_GB', type: 'website' },
};

export default function Page() {
  return <Gallery locale="en" />;
}
