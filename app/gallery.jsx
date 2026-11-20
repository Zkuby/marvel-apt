import { SiteHeader, SiteFooter } from './site';
import GalleryPhotos from './gallery-photos';
import './gallery-photos.css';

const copy = {
  lt: {
    title: 'Apartamentų galerija',
    intro: 'Pasirinkite nuotrauką, kad ją padidintumėte.',
    index: 'Visi vaizdai',
    viewer: { title: 'Nuotraukų peržiūra', close: 'Uždaryti', previous: 'Ankstesnė', next: 'Kita' },
    scenes: [
      ['Svetainė', 'Kampinė sofa prie plačių stumdomų terasos durų.'],
      ['Virtuvė', 'Tamsios virtuvės spintelės ir valgomojo stalas greta laiptų.'],
      ['Miegamasis', 'Apmušta lovos galvūgalio sienelė ir dieninės užuolaidos iki grindų.'],
      ['Vonia', 'Laisvai pastatoma vonia po veidrodžiu, kuriame atsispindi langas.'],
      ['Terasa', 'Kiemo terasoje stovi pinta sofa su pilkomis pagalvėmis.'],
      ['Fasadas', 'Medžiu apdailintas dviejų aukštų fasadas žvelgiant iš kiemo.'],
    ],
  },
  en: {
    title: 'Apartment gallery',
    intro: 'Select a photo to see it larger.',
    index: 'All views',
    viewer: { title: 'Photo viewer', close: 'Close', previous: 'Previous', next: 'Next' },
    scenes: [
      ['Living room', 'A corner sofa beside wide sliding doors to the terrace.'],
      ['Kitchen', 'Dark kitchen cabinets and a dining table beside the stairs.'],
      ['Bedroom', 'An upholstered headboard and sheer, floor-length curtains.'],
      ['Bath', 'A freestanding bath below a mirror that reflects the window.'],
      ['Terrace', 'A woven sofa with grey cushions on the courtyard terrace.'],
      ['Façade', 'The two-storey, timber-clad front of the house seen from the courtyard.'],
    ],
  },
};

const photos = [
  ['svetaine', '50% 54%'],
  ['virtuve', '50% 56%'],
  ['miegamasis', '58% 52%'],
  ['vonia', '50% 65%'],
  ['kiemo-terasa', '50% 78%'],
  ['namas-small', '50% 49%'],
];

export default function Gallery({ locale }) {
  const { title, intro, index, viewer, scenes } = copy[locale];
  const views = photos.map(([file, crop], i) => ({ crop, name: scenes[i][0], caption: scenes[i][1], src: `/photos/${file}.webp` }));
  return <>
    <SiteHeader locale={locale} page="gallery" />
    <main id="turinys" className="photo-folio" tabIndex={-1}>
      <div className="gallery-intro frame" data-reveal="text">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <GalleryPhotos views={views} index={index} viewer={viewer} />
    </main>
    <SiteFooter locale={locale} />
  </>;
}
