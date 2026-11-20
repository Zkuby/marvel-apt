export const sources = {
  airbnb: { label: 'Airbnb', rating: '5 / 5', count: 14, url: 'https://www.airbnb.com/rooms/1208412626408508372' },
  booking: { label: 'Booking.com', rating: '10 / 10', count: 27, url: 'https://www.booking.com/hotel/lt/marvel-apartments.lt.html#tab-reviews' },
  google: { label: 'Google Maps', rating: '4,8 / 5', url: 'https://maps.app.goo.gl/DeFLHTQiG99E4xKw9' },
};

export const reviewCount = sources.airbnb.count + sources.booking.count;
export const reviews = [
  { author: 'Ruta', source: 'airbnb', summary: {
    lt: 'Erdvu, švaru ir netoli centro. Kitą kartą norėtų apsistoti ilgiau, kad spėtų pasimėgauti visais patogumais.',
    en: 'Spacious, clean and close to the city centre. Next time, Ruta would stay longer to enjoy all the amenities.',
  } },
  { author: 'Brigita', source: 'booking', summary: {
    lt: 'Viešnia išskyrė švarą, patogią vietą ir sklandų bendravimą. Smulkmenos rodė, kad šeimininkams rūpi svečių patogumas.',
    en: 'Brigita singled out the cleanliness, convenient location and easy communication. The little details showed that the hosts cared about guests’ comfort.',
  } },
  { author: 'Laura', source: 'airbnb', summary: {
    lt: 'Labiausiai įsiminė vaizdas, gerai įrengti namai ir tai, kaip patogu iš čia pasiekti įvairias Kauno vietas.',
    en: 'The view, the well-equipped home and how easily Laura could get to different parts of Kaunas stood out most.',
  } },
  { author: 'Saugirdas', source: 'booking', summary: {
    lt: 'Maloni šeimininkė leido išvykti dviem valandomis vėliau. Svečias ypač rekomendavo namą didesnei grupei.',
    en: 'The friendly host let Saugirdas check out two hours later. He especially recommended the house for a larger group.',
  } },
  { author: 'Auktumas', source: 'airbnb', summary: {
    lt: 'Šeimai patiko erdvė, švara ir patogumas. Prireikus pagalbos, šeimininkai atsakydavo greitai.',
    en: 'The family liked how spacious, clean and comfortable it was. The hosts responded quickly when they needed help.',
  } },
  { author: 'Auguste', source: 'booking', summary: {
    lt: 'Viešnia įvertino jaukiai ir naujai įrengtas erdves, vietą automobiliams ir saugią aplinką.',
    en: 'Auguste appreciated the cosy, newly fitted spaces, the parking and the safe surroundings.',
  } },
  { author: 'Cedric', source: 'airbnb', summary: {
    lt: 'Įsiminė švara ir šiuolaikiška aplinka. Atvykimas bei išvykimas buvo sklandūs, su šeimininkais lengva susisiekti.',
    en: 'The cleanliness and modern setting stood out. Check-in and check-out went smoothly, and the hosts were easy to reach.',
  } },
  { author: 'Irmantas', source: 'booking', summary: {
    lt: 'Svečiui patiko ir vieta, ir patys apartamentai. Viešnage liko patenkintas.',
    en: 'Irmantas liked both the location and the apartment and was happy with his stay.',
  } },
];
