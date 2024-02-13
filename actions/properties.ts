'use server';

import { revalidatePath } from 'next/cache';
import * as database from './database';
import * as file from './file';
import * as users from './users';

async function verifyProperty(property: Partial<Kotilogi.PropertyType>){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            const isOk = await users.isAllowedToAddProperty(property.refId);
            resolve(isOk);
        }
        catch(err){
            reject(err);
        }
    })
}

async function verifyDeletion(propertyData: Kotilogi.PropertyType){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            //Only allow deletion of properties that are not a week old.
            const [savedData] = await database.get('properties', propertyData);
            const age = Date.now() - new Date(savedData.createdAt).getTime();
            const ok = age < 60 * 60  * 24 * 7 * 1000;
            resolve(ok);
        }
        catch(err){
            reject(err);
        }
    });
}

export async function add(property: Partial<Kotilogi.PropertyType>, files?: FormData[]){
    return new Promise<Kotilogi.PropertyType>(async (resolve, reject) => {
        try{
            //Check if the owner (refId) if the property is allowed to add properties.
            const isOk = await verifyProperty(property);
            if(!isOk) throw new Error('not_allowed');
    
            //Add the data into the database.
            const addedProperty = await database.addWithFiles('properties', 'propertyFiles', property, files);

            revalidatePath('/dashboard/properties');
            resolve(addedProperty as unknown as Kotilogi.PropertyType);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}

export async function del(data: Kotilogi.PropertyType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const ok = await verifyDeletion(data);
            if(!ok) reject('prohibited');
            
            await database.del('properties', data);
            revalidatePath('/dashboard/properties');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

export async function update(propertyId: Kotilogi.IdType, newPropertyData: Kotilogi.PropertyType){
    return new Promise<Kotilogi.PropertyType>(async (resolve, reject) => {
        try{
            const updatedProperty = await database.update('properties', propertyId, newPropertyData) as Kotilogi.PropertyType;
            revalidatePath('/properties/[property_id]/info');
            resolve(updatedProperty);
        }
        catch(err){
            reject(err);
        }
    });
}