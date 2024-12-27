import { getRefs } from 'kotilogi-app/dataAccess/ref';
import db from 'kotilogi-app/dbconfig';

export const getEventRefs = async () => {
  const roofTypes = await db('roofs.get_types');
  const roofMaterials = await db('roofs.get_materials');
  const heatingTypes = await db('property.get_heating_types');
  const eventTypes = await db('types.event_type');
  const eventTargets = await db('events.targets');
  const refs = await getRefs('ref_eventWorkTypes');

  return {
    ...refs,
    eventTargets,
    eventTypes,
    roofTypes,
    roofMaterials,
    heatingTypes,
  };
};
