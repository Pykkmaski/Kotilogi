import db from "kotilogi-app/dbconfig";
import { Files } from "./files";
import bcrypt from 'bcrypt';
import { DatabaseTable } from "./databaseTable";

export class Users extends DatabaseTable{
    async updatePassword(email: string, oldPassword: string, newPassword: string){
        const [{password: encryptedPassword}] = await db('users').where({email}).select('password');
        try{
            await bcrypt.compare(oldPassword, encryptedPassword).then(ok => {
                if(!ok){
                    throw new Error('invalid_password')
                }
            });
    
            await this.update({
                password: await bcrypt.hash(newPassword, 15),
            }, {email});

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
        await this.update({
            email: newEmail,
        }, {email: oldEmail});
    }
}