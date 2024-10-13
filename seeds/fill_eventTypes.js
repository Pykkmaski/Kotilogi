/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//Declare main types as constants, so they can be reused.

const mainTypesTable = 'ref_mainEventTypes';
const mainEventTypes = {
  Peruskorjaus: 'Peruskorjaus',
  Huoltotyo: 'Huoltotyö',
  Pintaremontti: 'Pintaremontti',
  UusiRakennus: 'Uusi rakennus',
  Muu: 'Muu',
};

const targetsTable = 'ref_eventTargets';
const eventTargets = {
  Hormi: 'Hormi',
  Ikkunat: 'Ikkunat',
  Katto: 'Katto',
  Julkisivu: 'Julkisivu',
  Keittio: 'Keittiö',
  WC: 'WC',
  Olohuone: 'Olohuone',
  Makuuhuone: 'Makuuhuone',
  Kodinhoitohuone: 'Kodinhoitohuone',
  Muu: 'Muu',
  Salaojat: 'Salaojat',
  Kayttovesiputket: 'Käyttövesiputket',
  Viemariputket: 'Viemäriputket',
  Eristys: 'Eristys',
  Lammonjako: 'Lämmönjako',
  Lammitysmuoto: 'Lämmitysmuoto',
  Eteinen: 'Eteinen',
  Savupiippu: 'Savupiippu',
  Vesikourut: 'Vesikourut',
  Huippuimuri: 'Huippuimuri',
  Ilmanvaihto: 'Ilmanvaihto',
  Sahkot: 'Sähköt',
  Lukitus: 'Lukitus',
  Muu: 'Muu',
};

const workTypesTable = 'ref_eventWorkTypes';
const workTypes = {
  Nuohous: 'Nuohous',
  Pinnoitus: 'Pinnoitus',
  Asennus: 'Asennus',
  Vaihto: 'Vaihto',
  Poisto: 'Poisto',
  Puhdistus: 'Puhdistus',
  Maalaus: 'Maalaus',
  Tapetointi: 'Tapetointi',
  Muu: 'Muu',
};

const targetsUnderMainType = {
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

  [mainEventTypes.Huoltotyo]: [eventTargets.Hormi, eventTargets.Savupiippu, eventTargets.Muu],
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

const workTypesUnderTarget = {
  [eventTargets.Hormi]: [workTypes.Nuohous, workTypes.Pinnoitus],
  [eventTargets.Savupiippu]: [workTypes.Nuohous],
};

exports.seed = async function (knex) {
  const insertTypeIntoTable = async (tablename, type) => {
    await knex(tablename)
      .insert({
        label: type,
      })
      .onConflict('label')
      .ignore();
  };

  //Fill the main types
  await Promise.all(Object.values(mainEventTypes).map(t => insertTypeIntoTable(mainTypesTable, t)));

  //Fill the targets.
  await Promise.all(Object.values(eventTargets).map(t => insertTypeIntoTable(targetsTable, t)));

  //Fill The work types.
  await Promise.all(Object.values(workTypes).map(t => insertTypeIntoTable(workTypesTable, t)));

  //Map targets to main type:
  const targetToMainTypeMapTable = 'map_workTargetsToMainEventType';
  for (const [mainTypeLabel, targets] of Object.entries(targetsUnderMainType)) {
    for (const targetLabel of targets) {
      //Fetch the id of the entry:
      const [targetId] = await knex(targetsTable).where({ label: targetLabel }).pluck('id');
      const [mainEventTypeId] = await knex(mainTypesTable)
        .where({ label: mainTypeLabel })
        .pluck('id');

      //Insert target into the map table refering to the id:
      await knex(targetToMainTypeMapTable)
        .insert({
          targetId,
          mainEventTypeId,
        })
        .onConflict(['mainEventTypeId', 'targetId'])
        .ignore();
    }
  }

  //Map work types to targets:
  const workTypeToTargetMapTable = 'map_workTypeToTarget';
  for (const [targetLabel, workTypes] of Object.entries(workTypesUnderTarget)) {
    const [targetId] = await knex(targetsTable).where({ label: targetLabel }).pluck('id');
    for (const workTypeLabel of workTypes) {
      const [workTypeId] = await knex(workTypesTable).where({ label: workTypeLabel }).pluck('id');

      await knex(workTypeToTargetMapTable)
        .insert({
          targetId,
          workTypeId,
        })
        .onConflict(['targetId', 'workTypeId'])
        .ignore();
    }
  }
};
