'use server';

import { createObject, updateObject } from 'kotilogi-app/models/objectData';
import { EventStepDataType } from 'kotilogi-app/models/types';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';

const table = 'data_eventSteps';

export async function ACreateEventStep(data: Partial<EventStepDataType>) {
  await createObject(data, async (obj, trx) => {
    const insertObj = filterValidColumns(data, await getTableColumns('data_eventSteps', trx));
    await trx(table).insert(insertObj);
  });
  return 0;
}

export async function AUpdateEventStep(
  data: Partial<EventStepDataType> & Required<Pick<EventStepDataType, 'id'>>
) {
  await updateObject(data, async trx => {
    const insertObj = filterValidColumns(data, await getTableColumns(table, trx));
    await trx(table)
      .where({ id: data.id })
      .update({
        ...insertObj,
        time: data.time && new Date(data.time).getTime(),
      });
  });
}
