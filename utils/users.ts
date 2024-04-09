import db from "kotilogi-app/dbconfig";
import { Files } from "./files";
import bcrypt from 'bcrypt';

export class Users extends Files{
    async updatePassword(email: string, oldPassword: string, newPassword: string){
        const [{password: encryptedPassword}] = await db('users').where({email}).select('password');
        try{
            await bcrypt.compare(oldPassword, encryptedPassword).then(ok => {
                if(!ok){
                    throw new Error('invalid_password')
                }
            });
    
            await db('users').where({email}).update({
                password: await bcrypt.hash(newPassword, 15),
            });

            return 'success';
        }
        catch(err){
            if(err.message === 'invalid_password'){
                return 'invalid_password';
            }
            else{
                return 'unexpected';
            }
        }
        
    }

    async updateEmail(oldEmail: string, newEmail: string){
        await db('users').where({email: oldEmail}).update({
            email: newEmail,
        });
    }
}