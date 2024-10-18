import { eventTargets } from './eventTargets';
import { workTypes } from './workTypes';

export const workTypesUnderTarget = {
  //Sadevesikourut
  [eventTargets.Sadevesikourut]: [workTypes.Puhdistus],
  //Paisuntasäiliö
  [eventTargets.Paisuntasailio]: [workTypes.Vaihto],
  [eventTargets.Oljykattila]: [workTypes.Huolto, workTypes.Korjaus, workTypes.Vaihto],

  //Lämminvesivaraaja
  [eventTargets.Lamminvesivaraaja]: [workTypes.Vaihto],

  //Maalämpöpumppu
  [eventTargets.Maalampopumppu]: [workTypes.Vaihto, workTypes.Korjaus],

  //Ilmalämpöpumppu
  [eventTargets.Ilmalampopumppu]: [workTypes.Korjaus, workTypes.Vaihto],

  //Vesi-Ilmalämpöpumppu
  [eventTargets.VesiIlmaLampoPumppu]: [workTypes.Vaihto, workTypes.Korjaus],

  //Lämmönjakokeskus
  [eventTargets.Lammonjakokeskus]: [workTypes.Vaihto, workTypes.Korjaus],

  //Piipunhattu
  [eventTargets.Piipunhattu]: [workTypes.Asennus, workTypes.Vaihto],

  //Lämmönjako
  [eventTargets.Lammonjako]: [workTypes.Ilmaus, workTypes.Korjaus, workTypes.TermostaatinVaihto],

  //Ikkunat
  [eventTargets.Ikkunat]: [workTypes.Pesu, workTypes.LasinVaihto],

  //Pistorasia
  [eventTargets.Pistorasia]: [workTypes.Vaihto],

  //Valokatkaisia
  [eventTargets.Valokatkaisia]: [workTypes.Vaihto],

  //Sähkökeskus
  [eventTargets.Sahkokeskus]: [workTypes.Vaihto],

  //Öljykattila
  [eventTargets.Oljykattila]: [workTypes.Huolto, workTypes.Korjaus, workTypes.Vaihto],

  //Julkisivu
  [eventTargets.Julkisivu]: [workTypes.Maalaus],

  //Sokkeli
  [eventTargets.Sokkeli]: [workTypes.Maalaus, workTypes.Pinnoitus],

  //Ilmanvaihtokone
  [eventTargets.Ilmanvaihtokone]: [workTypes.Huolto],

  //Ilmanvaihtokanavat
  [eventTargets.Ilmanvaihtokanavat]: [workTypes.Puhdistus],

  //Huippuimuri
  [eventTargets.Huippuimuri]: [workTypes.Asennus, workTypes.Vaihto],

  //Hormi
  [eventTargets.Hormi]: [
    workTypes.Nuohous,
    workTypes.Pinnoitus,
    workTypes.Sukitus,
    workTypes.Putkitus,
    workTypes.Ruiskutus,
  ],

  //Savupiippu
  [eventTargets.Savupiippu]: [workTypes.Pellitys],

  //Katto
  [eventTargets.Katto]: [
    workTypes.Pesu,
    workTypes.Korjaus,
    workTypes.Pinnoitus,
    workTypes.Maalaus,
    workTypes.Huoltomaalaus,
  ],

  [eventTargets.Salaojat]: [workTypes.SadevesisuppiloidenPuhdistus, workTypes.Puhdistus],
};
