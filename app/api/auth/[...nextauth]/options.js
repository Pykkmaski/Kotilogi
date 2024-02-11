import db from 'kotilogi-app/dbconfig';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

async function verifyUser(email, password){
    return new Promise(async (resolve, reject) => {
        try{
            const user = await db('users').where({email}).first();
            if(!user) throw new Error('invalid_user');

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect) throw new Error('password_mismatch');

            if(user.status === 'pending'){
                //Check if the trial period has ended
                const trialDuration = process.env.TRIAL_PERIOD_DURATION;

                if(trialDuration && trialDuration !== '0'){
                    const currentTime = Date.now();
                    const createdAtTime = new Date(user.createdAt).getTime();

                    if(currentTime - createdAtTime > parseInt(trialDuration)){
                        throw new Error('trial_expired');
                    }
                }
            }
            else if(user.status === 'inactive'){
                throw new Error('user_inactive');
            }

            resolve(user);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}

export const options = {
    jwt: {
        maxAge: 60 * 60 * 24,
    },
    
    pages: {
        signIn: '/login',
    },
    
    providers : [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',

            async authorize(credentials){
                const {email, password} = credentials;
                const user = await verifyUser(email, password);
                return user;
            }
        })
    ],

}