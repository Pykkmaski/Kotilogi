const { eventTargets } = require('./eventTargets.ts');
const { mainEventTypes } = require('./mainEventTypes.ts');

module.exports.targetsUnderMainType = {
  [mainEventTypes.Peruskorjaus]: [
    eventTargets.Ikkunat,
    eventTargets.Sahkot,
    eventTargets.Salaojat,
    eventTargets.Kayttovesiputket,
    eventTargets.Viemariputket,
    eventTargets.Ilmanvaihto,
    eventTargets.Lukitus,
    eventTargets.Eristys,
    eventTargets.Lammitysmuoto,
    eventTargets.Lammonjako,
    eventTargets.Katto,
    eventTargets.Muu,
  ],

  [mainEventTypes.Huoltotyo]: [
    eventTargets.Ilmanvaihto,
    eventTargets.Lammonjako,
    eventTargets.Lammitysmuoto,
    eventTargets.Eristys,
    eventTargets.Salaojat,
    eventTargets.Katto,
    eventTargets.Rakenteet,
    eventTargets.Viemariputket,
    eventTargets.Kayttovesiputket,
    eventTargets.Ikkunat,
    eventTargets.Sahkot,
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
