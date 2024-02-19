import db from 'kotilogi-app/dbconfig';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import * as database from '@/actions/database';

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

    callbacks: {
        async jwt({token, user}){
            if(user){
                if(user.activatedOn){
                    const currentDate = new Date();
                    const userActivatedDate = new Date(user.activatedOn);

                    const yearsSinceActivation = currentDate.getFullYear() - userActivatedDate.getFullYear();
                    const nextPaymentDate = new Date();
                    nextPaymentDate.setFullYear(currentDate.getFullYear() + 1 + yearsSinceActivation);
                    token.nextPayment = nextPaymentDate.toLocaleDateString('fi');
                    console.log(token.nextPayment);
                }
                
                token.plan = user.plan;
                token.status = user.status;
                token.createdAt = user.createdAt;
            }
            return token;
        },

        async session({session, token}){
            session.user.plan = token.plan;
            session.user.nextPayment = token.nextPayment;
            session.user.status = token.status;
            session.user.createdAt = token.createdAt;
            return session;
        }
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