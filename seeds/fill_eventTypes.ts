/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { mainTypesTable, mainEventTypes } = require('../constants/mainEventTypes.ts');
const { targetsTable, eventTargets } = require('../constants/eventTargets.ts');
const { workTypesTable, workTypes } = require('../constants/workTypes.ts');
const { targetsUnderMainType } = require('../constants/targetsUnderMainType.ts');
const { workTypesUnderTarget } = require('../constants/workTypesUnderTarget.ts');

exports.seed = async function (knex) {
  const insertTypeIntoTable = async (tablename, type) => {
    await knex(tablename)
      .insert({
        label: type,
      })
      .onConflict('label')
      .ignore();
  };

  //await knex(mainTypesTable).del();
  //Fill the main types
  await Promise.all(Object.values(mainEventTypes).map(t => insertTypeIntoTable(mainTypesTable, t)));

  // await knex(targetsTable).del();
  //Fill the targets.
  await Promise.all(Object.values(eventTargets).map(t => insertTypeIntoTable(targetsTable, t)));

  //await knex(workTypesTable).del();
  //Fill The work types.
  await Promise.all(Object.values(workTypes).map(t => insertTypeIntoTable(workTypesTable, t)));

  //Map targets to main type:
  const targetToMainTypeMapTable = 'map_workTargetsToMainEventType';
  const targetEntries = Object.entries(targetsUnderMainType);
  for (const [mainTypeLabel, targets] of targetEntries) {
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
  const workEntries = Object.entries(workTypesUnderTarget);
  for (const [targetLabel, workTypes] of workEntries) {
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
