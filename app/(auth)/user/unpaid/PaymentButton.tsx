'use client';

import Button from "@/components/Button/Button";
import { makeOrder } from "kotilogi-app/actions/payments";
import { useRouter } from "next/navigation";

export function PaymentButton({children, session}){

    const router = useRouter();
    
    const handlePayment = async () => {
        const paymentToken = await makeOrder(session.user.plan);
        router.push(`https://www.vismapay.com/pbwapi/token/${paymentToken.token}`);
    }

    return (
        <Button variant="primary" onClick={handlePayment}>{children}</Button>
    );
}