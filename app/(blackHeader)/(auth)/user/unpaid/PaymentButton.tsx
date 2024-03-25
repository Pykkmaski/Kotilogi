'use client';

import Button from "@/components/Button/Button";
import { makeOrder } from "kotilogi-app/actions/payments";
import { useRouter } from "next/navigation";

export function PaymentButton({children}){

    const router = useRouter();
    
    const handlePayment = async () => {
        const paymentToken = await makeOrder();
        router.push(`https://www.vismapay.com/pbwapi/token/${paymentToken.token}`);
    }

    return (
        <Button variant="primary" onClick={handlePayment}>{children}</Button>
    );
}