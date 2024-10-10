import db from 'kotilogi-app/dbconfig';
import { EventDataType } from './types';
import { batchUpdateObjects, createObject, deleteObject, updateObject } from './objects';
import { filterValidColumns } from './utils/filterValidColumns';
import { getTableColumns } from './utils/getTableColumns';
import { Knex } from 'knex';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { verifySessionUserIsAuthor } from './utils/verifySessionUserIsAuthor';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';

/**
 * @deprecated
 * @returns
 */
const getBaseEventQuery = () => {
  return db('data_objects')
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
    .join('ref_eventTargets', { 'ref_eventTargets.id': 'data_propertyEvents.targetId' })
    .join('ref_eventWorkTypes', { 'ref_eventWorkTypes.id': 'data_propertyEvents.workTypeId' })
    .join('ref_mainEventTypes', {
      'ref_mainEventTypes.id': 'data_propertyEvents.mainTypeId',
    })
    .select(
      'data_objects.*',
      'data_propertyEvents.*',
      'ref_eventTargets.label as targetLabel',
      'ref_eventWorkTypes.label as workTypeLabel',
      'ref_mainEventTypes.label as mainTypeLabel'
    );
};
