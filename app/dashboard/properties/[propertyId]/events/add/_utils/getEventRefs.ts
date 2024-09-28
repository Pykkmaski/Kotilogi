import { getRefs } from 'kotilogi-app/dataAccess/ref';

export const getEventRefs = async () =>
  await getRefs(
    'ref_roofMaterials',
    'ref_roofTypes',
    'ref_mainEventTypes',
    'ref_eventTargets',
    'ref_eventWorkTypes',
    'ref_heatingTypes',
    'ref_eventWorkTargetCategories'
  );
