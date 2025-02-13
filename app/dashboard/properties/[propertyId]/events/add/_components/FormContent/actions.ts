'use server';

import db from 'kotilogi-app/dbconfig';

export const getRaystastyypit = async () => await db('types.roof_eaves_type');
export const getOtsalautatyypit = async () => await db('types.roof_fascia_board_type');
export const getAluskatetyypit = async () => await db('types.roof_underlacing_type');
export const getColors = async () => await db('ref_mainColors');
export const getDrainageDitchMethods = async () =>
  db('restoration_events.drainage_ditch_implementation_method_type');
export const getHeatingSystems = async () => db('types.heating_type');
export const getElectricHeatingMethods = async () => db('ref_electricHeatingMethodTypes');
export const getLockTypes = async () => db('types.lock_type');
export const getElectricityJobTargets = async () => db('ref_electricityJobTargets');
export const getKayttovesiAsennusTavat = async () =>
  db('restoration_events.water_pipe_installation_method_type');
export const getViemariPutketAsennusTavat = async () =>
  db('restoration_events.sewer_pipe_restoration_method_type');
export const getEristeMateriaalit = async () => db('types.insulation_material_type');
export const getEristeKohteet = async () => db('types.insulation_target_type');
export const getCosmeticRenovationSurfaces = async () =>
  db('cosmetic_renovation_events.cosmetic_renovation_target_type');

export async function getRoof(property_id: string) {
  const roof = await db('new_events')
    .where(db.raw("event_type = 'Genesis' OR event_type = 'Peruskorjaus'"))
    .andWhere({ property_id })
    .select('data')
    .orderBy('date', 'desc', 'last')
    .first();
  return roof.data;
}

export async function getDrainageDitch(property_id: string) {
  const data = await db('new_events')
    .where(db.raw("event_type = 'Genesis' OR event_type = 'Peruskorjaus'"))
    .andWhere({ property_id, target_type: 'Salaojat' })
    .select('data')
    .orderBy('date', 'desc', 'last')
    .first();

  return data?.data;
}

export const getCurrentHeatingSystems = async (property_id: string) => {
  const heatingTypes = await db('new_events')
    .where({ event_type: 'Peruskorjaus' })
    .orWhere({ event_type: 'Genesis' })
    .andWhere({ property_id, target_type: 'Lämmitysmuoto' })
    .select('data')
    .orderBy('date', 'desc', 'last')
    .first();
  console.log(heatingTypes);

  return heatingTypes?.data?.heating_types;
};
