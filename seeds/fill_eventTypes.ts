/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import { eventTargets, targetsTable } from '../constants/eventTargets';
import { mainEventTypes, mainTypesTable } from '../constants/mainEventTypes';
import { targetsUnderMainType } from '../constants/targetsUnderMainType';
import { workTypes, workTypesTable } from '../constants/workTypes';
import { workTypesUnderTarget } from '../constants/workTypesUnderTarget';

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
