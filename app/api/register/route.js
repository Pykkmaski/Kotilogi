import db from 'kotilogi-app/dbconfig';

async function getUser(email){
    return await db('users').where({email}).first();
}

export async function POST(req){
    try{
        const {email, password1, password2, first_name, last_name} = await req.json();
        const user = await getUser(email);
        if(user) return new Response('User already exists', {status: 406});

        if(password1 !== password2) return new Response('Passwords do not match', {status: 409});

        const hashedPassword = await bcrypt.hash(password1, 15);

        await db('users').insert({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            active: 0,
        });

        return new Response(null, {status: 200});
    }
    catch(err){
        console.log(err.message);
        return new Response(err.message, {status: 500});    
    }
}