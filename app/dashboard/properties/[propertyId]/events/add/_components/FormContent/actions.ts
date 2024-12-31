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
export const getEristeMateriaalit = async () => db('insulation.materials');
export const getEristeKohteet = async () => db('insulation.targets');

export const getRoof = async (property_id: string) => {
  return await db('roof').where({ property_id });
};

export const getCurrentHeatingSystems = async (property_id: string) => {
  return await db('heating')
    .join(db.raw('types.heating_type on types.heating_type.id = heating.heating_type_id'))
    .where({ 'heating.property_id': property_id })
    .select('heating.*', 'types.heating_type.name as heating_type_label');
};
