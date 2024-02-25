'use server';

import { MaxProperties } from "kotilogi-app/constants";
import * as database from './database';
import { UserType } from "kotilogi-app/types/UserType";
import db from "kotilogi-app/dbconfig";
import bcrypt from 'bcrypt';
import { sendAccountActivationLink } from "./email";

/**Verifies a users password. */
async function verifyPassword(email: string, password: string){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            const [user] = await db('users').where({email}).select('password');
            const isOk = await bcrypt.compare(password, user.password);
            resolve(isOk);
        }
        catch(err){
            reject(err);
        }
    });
}

/**Returns the number of properties a user has. */
export async function getPropertyCount(email: string){
    return new Promise<number>(async (resolve, reject) => {
        try{
            const {count} = await db('properties').where({refId: email}).count('*', {as: 'count'}) as {count: number};
            resolve(count);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}

/**Returns the maximum number of properties a user is allowed to have. */
export async function getMaxProperties(email: string){
    return new Promise<number>(async (resolve, reject) => {
        try{
            const [user] = await database.get<Partial<UserType>>('users', {email});

            if(!user) throw new Error('invalid_user');

            switch(user.plan){
                case 'regular':
                    return resolve(MaxProperties.REGULAR);

                case 'pro':
                    return resolve(MaxProperties.PRO);

                default: resolve(0);
            }
        }
        catch(err){
            reject(err);
        }
    });
}

/**Checks if a user is allowed to add properties. */
export async function isAllowedToAddProperty(email: string): Promise<boolean>{
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            //Get the number of properties a user has, and how many they are allowed to have.
            const [propertyCount, maxPropertiesAllowed] = await Promise.all([getPropertyCount(email), getMaxProperties(email)]);
    
            resolve(maxPropertiesAllowed < 0 || propertyCount < maxPropertiesAllowed);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}

type RegisterStatusType = 'success' | 'user_exists' | 'unexpected';

/**
 * Adds a new user to the database.
 * @param credentials An object containing the email and password for the new user.
 * @returns
 */

export async function register(credentials: {email: string, password: string, plan: string}){
    return new Promise<RegisterStatusType>(async (resolve, reject) => {
        try{
            const user = {
                email: credentials.email,
                password: await bcrypt.hash(credentials.password, 15),
                plan: credentials.plan,
                status: 'pending',
            }
            
            await db('users').insert(user);
            await sendAccountActivationLink(user.email);
            resolve('success');
        }
        catch(err){
            const msg = err.message.toUpperCase();
    
            if(msg.includes('UNIQUE') || msg.includes('DUPLICATE')){
                resolve('user_exists');
            }
            else{
                console.log(err.message);
                resolve('unexpected');
            } 
        }
    });
}

/**Updates a user's password */
export async function updatePassword(email: string, newPassword: string, currentPassword: string){
    return new Promise<string>(async (resolve, reject) => {
        try{
            const isCorrectPassword = await verifyPassword(email, currentPassword);
            if(!isCorrectPassword) return resolve('invalid_password');

            const encryptedPassword = await bcrypt.hash(newPassword, 15);
            await db('users').where({email}).update({
                password: encryptedPassword,
            });

            return resolve('success');
        }
        catch(err){
            reject(err);
        }
    });
}