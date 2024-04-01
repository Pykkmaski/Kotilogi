'use client';

import Button from "@/components/Button/Button";
import { makeOrder } from "kotilogi-app/actions/payments";
import { useRouter } from "next/navigation";

export function PaymentButton({children, ...props}: React.ComponentProps<'button'>){

    const router = useRouter();

    const makePayment = async () => {
        const paymentToken = await makeOrder();
        router.push(`https://www.vismapay.com/pbwapi/token/${paymentToken.token}`);
    }

    return (
        <Button {...props} variant="primary-dashboard" onClick={makePayment}>
            {children}
        </Button>
    )
}