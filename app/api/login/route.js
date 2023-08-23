import jwt from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';

async function VerifyPassword(encrypted, password){
    return await bcrypt.compare(password, encrypted);
}

function createPayload(user){
    const token = jwt.sign(user, process.env.TOKEN_SECRET);
    return {
        token,
        email: user.email,
        active: user.active,
    }
}

export async function POST(req){
    try{
        const {email, password} = await req.json();

        //Get the user from the database
        const user = await db('users').where({email}).first();
        if(!user) return new Response('User does not exist', {status: 404});

        //Compare passwords
        const passwordComparisonResult = await VerifyPassword(user.password, password);
        if(!passwordComparisonResult) return new Response('Invalid password', {status: 403});

        const payload = createPayload(user);

        return new Response(JSON.stringify(payload), {
            status: 200,
        });
    }
    catch(err){
        console.log(err.message);
        return new Response(err.message, {
            status: 500,
        });
    }
}