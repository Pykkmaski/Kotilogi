const { eventTargets } = require('./eventTargets.ts');
const { workTypes } = require('./workTypes.ts');

module.exports.workTypesUnderTarget = {
  [eventTargets.Ilmanvaihto]: [
    workTypes.HorminMassaus,
    workTypes.HorminRuiskutus,
    workTypes.HorminPutkitus,
    workTypes.HorminNuohous,
    workTypes.HorminSukitus,
    workTypes.Muu,
  ],

  //Lämmönjako
  [eventTargets.Lammonjako]: [
    workTypes.Ilmaus,
    workTypes.Korjaus,
    workTypes.TermostaatinVaihto,
    workTypes.Muu,
  ],

  //Ikkunat
  [eventTargets.Ikkunat]: [workTypes.Pesu, workTypes.LasinVaihto, workTypes.Muu],

  //Katto
  [eventTargets.Katto]: [
    workTypes.Pesu,
    workTypes.Korjaus,
    workTypes.Pinnoitus,
    workTypes.Maalaus,
    workTypes.Huoltomaalaus,
    workTypes.Muu,
  ],

  [eventTargets.Salaojat]: [workTypes.JarjestelmanPuhdistus, workTypes.Muu],

  [eventTargets.Lammitysmuoto]: [
    workTypes.OljykattilanHuolto,
    workTypes.OljykattilanVaihto,
    workTypes.OljykattilanKorjaus,
    workTypes.PaisuntasailionVaihto,
    workTypes.LamminvesivaraajanVaihto,
    workTypes.MaalampopumpunKorjaus,
    workTypes.MaalampopumpunVaihto,
    workTypes.IlmalampopumpunKorjaus,
    workTypes.IlmalampopumpunVaihto,
    workTypes.VesiIlmalampopumpunKorjaus,
    workTypes.VesiIlmalampopumpunVaihto,
    workTypes.LammonjakokeskuksenKorjaus,
    workTypes.LammonjakokeskuksenVaihto,
    workTypes.Muu,
  ],

  [eventTargets.Sahkot]: [
    workTypes.PistorasianVaihto,
    workTypes.SahkokeskuksenVaihto,
    workTypes.ValokatkaisianVaihto,
    workTypes.Muu,
  ],

  [eventTargets.Rakenteet]: [
    workTypes.JulkisivunMaalaus,
    workTypes.SokkelinMaalaus,
    workTypes.SokkelinPinnoitus,
    workTypes.Korjaus,
    workTypes.Muu,
  ],

  [eventTargets.Muu]: [workTypes.Muu],
};
