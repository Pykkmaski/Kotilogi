import { DatabaseTable } from "kotilogi-app/utils/databaseTable";
import { NextRequest, NextResponse } from "next/server";

/**Clears all users that have not activated their account within 6 months. */
export async function POST(req: NextRequest){
    try{
        const auth = req.headers.get('Authorization');
        
        if(auth != process.env.API_KEY){
            return new NextResponse('Invalid authorization!', {
                status: 403,
            });
        }

        const usersTable = new DatabaseTable('users');

        await usersTable.get({status: 'unconfirmed'})
        .then(async unconfirmedUsers => {

            for(const user of unconfirmedUsers){
                const expiryDate = new Date(user.createdAt);
                expiryDate.setMonth(expiryDate.getMonth() + 6);

                if(Date.now() >= expiryDate.getTime()){
                    await usersTable.del({email: user.email});
                }
            }
        });

        return new NextResponse(null, {
            status: 200,
        });
    }
    catch(err){
        return new NextResponse(err.message, {
            status: 500,
        });
    }
}