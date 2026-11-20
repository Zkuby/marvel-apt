import MissingPage from '../../../missing-page';

export const metadata = { title: 'Page not found | Marvel Apartments', robots: { index: false } };

export default function Page() {
  return <MissingPage locale="en" />;
}