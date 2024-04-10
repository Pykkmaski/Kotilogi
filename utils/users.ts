import db from "kotilogi-app/dbconfig";
import { Files } from "./files";
import bcrypt from 'bcrypt';
import { DatabaseTable } from "./databaseTable";
import { RegisterStatusType } from "kotilogi-app/app/(blackHeader)/register/useRegister";

export class Users{
    async updatePassword(email: string, oldPassword: string, newPassword: string){
        const usersTable = new DatabaseTable('users');

        const [{password: encryptedPassword}] = await usersTable.select('password', {email: oldPassword});
        try{
            await bcrypt.compare(oldPassword, encryptedPassword).then(ok => {
                if(!ok){
                    throw new Error('invalid_password')
                }
            });
    
            await usersTable.update({
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
        const usersTable = new DatabaseTable('users');
        await usersTable.update({
            email: newEmail,
        }, {email: oldEmail});
    }

    async registerUser(credentials: {email: string, password: string, plan: string}){
        const usersTable = new DatabaseTable('users');
        const user = {
            email: credentials.email,
            password: await bcrypt.hash(credentials.password, 15),
            plan: credentials.plan,
        }

        return await usersTable.add(user)
        .then(() => 'success')
        .catch(err => {
            const msg = err.message.toUpperCase();
            if(msg.includes('UNIQUE') || msg.includes('DUPLICATE')){
                return 'user_exists';
            }
            else{
                throw err;
            }
        });
    }
}