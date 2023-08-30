import db from 'kotilogi-app/dbconfig';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import bcrypt from 'bcrypt';

export const options = {

    jwt: {
        maxAge: 60 * 60 * 24,
    },
    
    pages: {
        signIn: '/login',
        error: '/error',
    },

    providers : [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',

            async authorize(credentials){
                const {email, password} = credentials;
                const user = await db('users').where({email}).first();
                
                if(!user) throw new Error('invalid_user');

                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if(!isPasswordCorrect) throw new Error('invalid_password');
                return user;
            }
        })
    ],

}