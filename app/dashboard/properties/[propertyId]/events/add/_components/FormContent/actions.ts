'use server';

import db from 'kotilogi-app/dbconfig';

export const getRaystastyypit = async () => await db('ref_raystastyypit');
export const getOtsalautatyypit = async () => await db('ref_otsalautatyypit');
export const getAluskatetyypit = async () => await db('ref_aluskatetyypit');
export const getColors = async () => await db('ref_mainColors');
export const getDrainageDitchMethods = async () => db('ref_drainageDitchMethods');
export const getHeatingSystems = async () => db('ref_heatingTypes');
export const getElectricHeatingMethods = async () => db('ref_electricHeatingMethodTypes');
export const getLockTypes = async () => db('ref_lockTypes');
export const getElectricityJobTargets = async () => db('ref_electricityJobTargets');
export const getKayttovesiAsennusTavat = async () => db('ref_kayttovesiPutketAsennusTavat');
export const getViemariPutketAsennusTavat = async () => db('ref_viemariPutketToteutusTapa');
