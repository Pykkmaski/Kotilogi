import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addBillingData, getPayment, getPaymentStatus, updateUserStatus } from "./page.actions";

export function useCheckoutResultPage(){
    const searchParams = useSearchParams();
    const {data: session, update} = useSession();
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

    const [payment, setPayment] = useState<any>(null);
    const [paymentStatus, setPaymentStatus] = useState<any>(null);

    const returnCode = parseInt(searchParams.get('RETURN_CODE'));
    const orderNumber = searchParams.get('ORDER_NUMBER');

    useEffect(() => {
        const process = async () => {
            await Promise.all([
                getPayment(orderNumber), 
                getPaymentStatus(orderNumber)
            ])
            .then(([{result, payment}, paymentStatus]) => {
                setPayment(payment);
                setPaymentStatus(paymentStatus);
            });

            if(returnCode == 0){
                //The payment succeeded. Add relevant data to the database.

                //Add a bill for this user, to be charged monthly with the card token.
                await addBillingData(payment);
    
                //Update the users status to active.
                const [newUser] = await updateUserStatus(payment);

                //Update the session. (This doesn't work)
                if(session){
                    update({
                        user: {
                            ...session?.user,
                            plan: newUser.plan,
                            status: newUser.status,
                        }
                    });
                }
            }
        };

        process().then(() => setStatus('success')).catch(err => setStatus('error'));
        
    }, []);

    return {
        returnCode,
        status,
        paymentStatus,
    }
}