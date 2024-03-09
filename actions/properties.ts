'use server';

import { revalidatePath } from 'next/cache';
import * as database from './database';
import * as file from './file';
import * as users from './users';
import db from 'kotilogi-app/dbconfig';
import { unlink } from 'fs/promises';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { createBill, createCart } from './bills';

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

export async function verifyDeletion(propertyData: Kotilogi.PropertyType){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            //Only allow deletion of properties that are not a month old.
            const [savedData] = await database.get('properties', {id: propertyData.id}) as unknown as Kotilogi.PropertyType[];
            const age = Date.now() - new Date(savedData.createdAt).getTime();
            const ok = age < 3600 * 1000 * 24 * 30;
            resolve(ok);
        }
        catch(err){
            reject(err);
        }
    });
}

export async function add(property: Partial<Kotilogi.PropertyType>, files?: FormData[]){
    const trx = await db.transaction();
    let addedFileData: Kotilogi.FileType[] = [];

    try{
        //Add the data into the database.
        const [addedProperty] = await trx('properties').insert(property, '*') as Kotilogi.PropertyType[];
        addedFileData = await file.upload(files);

        //Get the customer cart
        const cart = await trx('carts').where({customer: property.refId})
        .then(async ([cart]) => {
            if(!cart){
                //A cart for this customer doesn't exist. Create one.
                const newCart = createCart(property.refId);
                return await trx('carts').insert(newCart, '*');
            }
            else{
                return cart;
            }
        });

        //Create a new bill
        const bill = createBill(cart.id, 990, addedProperty.id, 'add_property');
        await trx('cartItems').insert(bill);

        await trx.commit();
        revalidatePath('/dashboard/properties');
        return addedProperty as unknown as Kotilogi.PropertyType;
    }
    catch(err){
        console.log(err.message);

        for(const fdata of addedFileData){
            try{
                await unlink(fdata.fileName);
            }
            catch(err){
                console.log(err.message);
                throw err;
            }
        }
        
        await trx.rollback();
        throw err;
    }
}

export async function del(data: Kotilogi.PropertyType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const ok = await verifyDeletion(data);
            if(!ok) reject('prohibited');
            
            await database.delWithFiles('properties', 'propertyFiles', data);
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
            const [updatedProperty] = await db('properties').where({id: propertyId}).update(newPropertyData, '*') as Kotilogi.PropertyType[];
            revalidatePath('/properties/[property_id]/info');
            resolve(updatedProperty);
        }
        catch(err){
            reject(err);
        }
    });
}

export async function uploadFile(fileData: FormData, refId: string){
    const trx = await db.transaction();
    let uploadedFileData: Kotilogi.FileType | null = null;

    try{
        [uploadedFileData] = await file.upload([fileData]);
        await trx('propertyFiles').insert({
            ...uploadedFileData,
            refId,
        });

        revalidatePath('/properties/[property_id]/files');
        revalidatePath('/properties/[property_id]/images');

        await trx.commit();
    }
    catch(err){
        console.log(err.message);

        if(uploadedFileData){
            //Delete the file if it was uploaded.
            try{
                await unlink(uploadPath + uploadedFileData.fileName);
            }
            catch(err){
                console.log(err.message);
                throw err;
            }
        }

        await trx.rollback();
        throw err;
    }
}

export async function deleteFile(fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await file.del('propertyFiles', fileData);
            revalidatePath('/properties/[property_id]/files');
            revalidatePath('/properties/[property_id]/images');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}