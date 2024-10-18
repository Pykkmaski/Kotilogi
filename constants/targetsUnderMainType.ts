import { eventTargets } from './eventTargets';
import { mainEventTypes } from './mainEventTypes';

export const targetsUnderMainType = {
  [mainEventTypes.Peruskorjaus]: [
    eventTargets.Ikkunat,
    eventTargets.Sahkot,
    eventTargets.Salaojat,
    eventTargets.Kayttovesiputket,
    eventTargets.Viemariputket,
    eventTargets.Ilmanvaihto,
    eventTargets.Lukitus,
    eventTargets.Eristys,
    eventTargets.Muu,
  ],

  [mainEventTypes.Huoltotyo]: [
    eventTargets.Hormi,
    eventTargets.Savupiippu,
    eventTargets.Salaojat,
    eventTargets.Katto,
    eventTargets.Sadevesikourut,
    eventTargets.Paisuntasailio,
    eventTargets.Oljykattila,
    eventTargets.Lamminvesivaraaja,
    eventTargets.Maalampopumppu,
    eventTargets.Lammonjakokeskus,
    eventTargets.Lammonjako,
    eventTargets.Ilmanvaihtokanavat,
    eventTargets.Ilmanvaihtokone,
    eventTargets.Ikkunat,
    eventTargets.Muu,
  ],

  [mainEventTypes.Pintaremontti]: [
    eventTargets.Kodinhoitohuone,
    eventTargets.Olohuone,
    eventTargets.WC,
    eventTargets.Keittio,
    eventTargets.Makuuhuone,
    eventTargets.Muu,
  ],
  [mainEventTypes.Muu]: Object.values(eventTargets),
};
