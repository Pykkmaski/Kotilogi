'use server';

import db from 'kotilogi-app/dbconfig';

export const getRaystastyypit = async () => await db('roofs.ref_raystastyypit');
export const getOtsalautatyypit = async () => await db('roofs.ref_otsalautatyypit');
export const getAluskatetyypit = async () => await db('roofs.ref_aluskatetyypit');
export const getColors = async () => await db('ref_mainColors');
export const getDrainageDitchMethods = async () => db('drainage_ditches.implementation_methods');
export const getHeatingSystems = async () => db('heating.types');
export const getElectricHeatingMethods = async () => db('ref_electricHeatingMethodTypes');
export const getLockTypes = async () => db('locking.types');
export const getElectricityJobTargets = async () => db('ref_electricityJobTargets');
export const getKayttovesiAsennusTavat = async () => db('water_pipe.installation_method');
export const getViemariPutketAsennusTavat = async () => db('sewer_pipe.restoration_method_type');
export const getEristeMateriaalit = async () => db('insulation.materials');
export const getEristeKohteet = async () => db('insulation.targets');

export const getRoof = async (property_id: string) => {
  return await db('objects.data')
    .join(db.raw('events.data on events.data.id = objects.data.id'))
    .join(db.raw('roofs.overview on roofs.overview.event_id = events.data.id'))
    .where({ 'objects.data.parentId': property_id })
    .select('roofs.overview.*');
};
