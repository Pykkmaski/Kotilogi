import db from "kotilogi-app/dbconfig"

/**Checks if a user with the given email is the owner of the property with given id. */
export async function isUserTheOwnerOfProperty(email: string, propertyId: string){
    return new Promise(async (resolve, reject) => {
        try{
            const property = await db('properties').where({refId: email, id: propertyId}).first();
            resolve(property !== undefined);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}