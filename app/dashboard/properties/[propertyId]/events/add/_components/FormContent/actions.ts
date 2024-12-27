'use server';

import db from 'kotilogi-app/dbconfig';

export const getRaystastyypit = async () => await db('roofs.ref_raystastyypit');
export const getOtsalautatyypit = async () => await db('roofs.ref_otsalautatyypit');
export const getAluskatetyypit = async () => await db('roofs.ref_aluskatetyypit');
export const getColors = async () => await db('ref_mainColors');
export const getDrainageDitchMethods = async () => db('drainage_ditches.implementation_methods');
export const getHeatingSystems = async () => db('types.heating_type');
export const getElectricHeatingMethods = async () => db('ref_electricHeatingMethodTypes');
export const getLockTypes = async () => db('types.lock_type');
export const getElectricityJobTargets = async () => db('ref_electricityJobTargets');
export const getKayttovesiAsennusTavat = async () => db('types.water_pipe_installation_method');
export const getViemariPutketAsennusTavat = async () => db('types.sewer_pipe_restoration_method');
export const getEristeMateriaalit = async () => db('insulation.materials');
export const getEristeKohteet = async () => db('insulation.targets');

export const getRoof = async (property_id: string) => {
  return await db('roofs.data').where({ property_id });
};

export const getCurrentHeatingSystems = async (property_id: string) => {
  return await db('heating.data')
    .join(db.raw('types.heating_type on types.heating_type.id = heating.data.heating_type_id'))
    .where({ 'heating.data.property_id': property_id })
    .select('heating.data.*', 'types.heating_type.name as heating_type_label');
};
