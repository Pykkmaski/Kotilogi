'use server';

import { revalidatePath } from 'next/cache';
import * as database from './database';
import * as file from './file';
import * as users from './users';
import db from 'kotilogi-app/dbconfig';
import { unlink } from 'fs/promises';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { createBill, createCart } from './bills';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

export async function verifyDeletion(propertyAge: string){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            //Only allow deletion of properties that are not a month old.
            const age = Date.now() - new Date(propertyAge).getTime();
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
    let fileUploadResults: PromiseSettledResult<any>[] = [];
    let rollbackUpload: () => Promise<void> | null = null;

    try{
        //Add the data into the database.
        const [{id: addedPropertyId}] = await trx('properties').insert(property, 'id') as {id: string}[];

        //Upload the files.
        let addedFileData: Kotilogi.FileType[] = [];
        [addedFileData, rollbackUpload] = await file.upload(files);

        //Insert the file data
        for(const fileData of addedFileData){
            await trx('propertyFiles').insert({
                ...fileData,
                refId: addedPropertyId,
            });
        }

        //Get the customer cart
        const cart = await trx('carts').where({customer: property.refId})
        .then(async ([cart]) => {
            if(!cart){
                //A cart for this customer doesn't exist. Create one.
                const [newCart] = await trx('carts').insert(createCart(property.refId), '*');
                return newCart;
            }
            else{
                return cart;
            }
        });

        //Create a new bill
        const bill = createBill(cart.id, 990, addedPropertyId, 'add_property');
        await trx('cartItems').insert(bill);

        await trx.commit();
        revalidatePath('/dashboard/properties');
    }
    catch(err){
        console.log(err.message);

        if(rollbackUpload){
            await rollbackUpload();
        }

        await trx.rollback();
        throw err;
    }
}

export async function del(data: Kotilogi.PropertyType){
    const trx = await db.transaction();
    let rollbackFileDelete: () => Promise<void> | null = null;

    try{
        const [{createdAt: propertyAge}] = await trx('properties').where({id: data.id}).select('createdAt');
  
        const ok = await verifyDeletion(propertyAge);
        if(!ok) throw new Error('Property deletion prohibited!');

        const fileData = await trx('propertyFiles').where({refId: data.id}).then(async (propertyFiles: Kotilogi.FileType[]) => {
            //Get the events for this property.
            const eventIds = await trx('propertyEvents').where({refId: data.id}).pluck('id');

            //Get the files for the events.
            const eventFiles = await trx('eventFiles').whereIn('refId', eventIds);

            //Add the event files to the property files.
            return propertyFiles.concat(eventFiles) as Kotilogi.FileType[];
        });

        rollbackFileDelete = await file.del(fileData);

        await trx('properties').where({id: data.id}).del();

        await trx.commit();

        revalidatePath('/dashboard/properties');
    }
    catch(err){
        console.log(err.message);

        if(rollbackFileDelete){
            await rollbackFileDelete();
        }

        await trx.rollback();
        throw err;
    }
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
    let rollbackUpload: () => Promise<void> | null;

    try{
        [[uploadedFileData], rollbackUpload] = await file.upload([fileData]);

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

        if(rollbackUpload){
            try{
                await rollbackUpload();
            }
            catch(err){
                console.log('Upload rollback failed!');
            }
        }

        await trx.rollback();
        throw err;
    }
}

export async function deleteFile(fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        let rollbackDelete: () => Promise<void>;
        const trx = await db.transaction();
        
        try{
            rollbackDelete = await file.del([fileData]);
            await trx('propertyFiles').where({id: fileData.id}).del();
            await trx.commit();

            revalidatePath('/properties/[property_id]/files');
            revalidatePath('/properties/[property_id]/images');
            resolve();
        }
        catch(err){
            try{
                if(rollbackDelete){
                    rollbackDelete();
                }
                await trx.rollback();
            }
            catch(err){
                console.log(err.message);
            }
            
            reject(err);
        }
    });
}

export async function generateTransferKey(data: {
    propertyAddress: string;
    receiverEmail: string;
    senderEmail: string;
    senderPassword: string;
}){
    const [{password: senderPassword}] = await db('users').where({email: data.senderEmail}).select('password');
    const passwordOk = await bcrypt.compare(data.senderPassword, senderPassword);

    var error: 'invalid_password' | null = null;
    if(!passwordOk) error = 'invalid_password';

    const token = jwt.sign(data, process.env.TRANSFER_SECRET);
    return {
        token, error
    }
}

export async function transferOwnership(token: string){
    const data = jwt.verify(token, process.env.TRANSFER_SECRET);
    console.log(data);
}