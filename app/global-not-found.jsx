import Document from './document';
import MissingPage from './missing-page';

export const metadata = { title: 'Puslapis nerastas | Marvel apartamentai', robots: { index: false } };

export default function GlobalNotFound() {
  return <Document locale="lt"><MissingPage locale="lt" /></Document>;
}