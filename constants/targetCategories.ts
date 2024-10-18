import { eventTargets } from './eventTargets';

export const targetCategories = {
  Lammitys: 'Lämmitys',
  Ilmanvaihto: 'Ilmanvaihto',
  Sahko: 'Sähkö',
  Rakenteet: 'Rakenteet',
  Maanrakennus: 'Maanrakennus',
  Kayttovesi: 'Kayttovesi',
  Viemäröinti: 'Viemäröinti',
};

export const targetsUnderCategories = {
  [targetCategories.Lammitys]: [
    eventTargets.Paisuntasailio,
    eventTargets.Termostaatti,
    eventTargets.Oljykattila,
    eventTargets.Lammonjakokeskus,
    eventTargets.Maalampopumppu,
    eventTargets.Lammonjako,
    eventTargets.Lammitysmuoto,
  ],

  [targetCategories.Ilmanvaihto]: [
    eventTargets.Ilmanvaihtokanavat,
    eventTargets.Ilmanvaihtokone,
    eventTargets.Huippuimuri,
  ],

  [targetCategories.Sahko]: [
    eventTargets.Valokatkaisia,
    eventTargets.Pistorasia,
    eventTargets.Sahkokeskus,
  ],

  [targetCategories.Rakenteet]: [eventTargets.Katto, eventTargets.Julkisivu],
  [targetCategories.Maanrakennus]: [eventTargets.Salaojat],
};
