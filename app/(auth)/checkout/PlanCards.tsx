'use client';

import { ProPlanCard, RegularPlanCard } from "@/components/HomePage/ProfileText";
import { UserPlanType, UserType } from "kotilogi-app/types/UserType"
import * as payments from '@/actions/payments';
import { useRouter } from "next/navigation";

type PlanCardsProps = {
    session: {
        user: UserType,
    }
}

export function PlanCards({session}: PlanCardsProps){

    const router = useRouter();

    const createOrder = async (plan: UserPlanType) => {
        const paymentToken = await payments.makeOrder(plan);
        router.push(`https://www.vismapay.com/pbwapi/token/${paymentToken.token}`);
    }

    return (
        <div className="flex gap-4">
            <RegularPlanCard buttonAction={() => createOrder('regular')}/>
            <ProPlanCard buttonAction={() => createOrder('pro')}/>
        </div>
    );
}