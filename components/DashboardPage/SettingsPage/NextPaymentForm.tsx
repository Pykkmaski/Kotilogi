'use client';

import { useSession } from "next-auth/react";

export function NextPaymentForm(){
    const {data: session, status} = useSession();
    console.log(status);

    console.log(session);

    return (
        <div className="text-slate-500">
            {
                status === 'loading' ? <h1>Ladataan käyttäjää...</h1>
                :
                status === 'authenticated' ? <h1>{(session.user as any).plan} {(session.user as any).nextPayment}</h1>
                :
                <h1>Pääsy evätty.</h1>
            }
        </div>
        
    )
}