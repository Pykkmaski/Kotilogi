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

    return (
        null
    );
}