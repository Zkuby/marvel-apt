import { chrome, paths } from './locales.mjs';

export default function MissingPage({ locale }) {
  return <main className="spaces frame missing-page">
    <h1>{chrome[locale].notFound}</h1>
    <a className="text-link" href={paths.home[locale]}>{chrome[locale].back}</a>
  </main>;
}