import db from 'kotilogi-app/dbconfig';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const options = {

    jwt: {
        maxAge: 60 * 60 * 24,
    },
    
    providers : [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Sähköposti:',
                    type: 'email',
                    placeholder: 'Anna Sähköpostiosoitteesi',
                },
                password: {
                    label: 'Salasana:',
                    type: 'password',
                }
            },

            async authorize(credentials){
                const user = await db('users').where({username: credentials?.username});
                const ok = user && bcrypt.compare(credentials?.password, user.password);
                if(!ok) return null;
                
                return user;
            }
        })
    ],

}