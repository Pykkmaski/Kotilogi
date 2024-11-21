const { mainEventTypes } = require('./mainEventTypes.ts');
const { eventTargets } = require('./eventTargets.ts');

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
    eventTargets.Palovaroittimet,
  ],

  [mainEventTypes.Pintaremontti]: [
    eventTargets.Kodinhoitohuone,
    eventTargets.Olohuone,
    eventTargets.WC,
    eventTargets.Keittio,
    eventTargets.Makuuhuone,
    eventTargets.Muu,
    eventTargets.Vaatehuone,
    eventTargets.Eteinen,
  ],
  [mainEventTypes.Muu]: Object.values(eventTargets),
};
