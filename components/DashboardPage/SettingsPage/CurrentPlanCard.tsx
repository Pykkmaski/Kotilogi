'use client';

import Button from "@/components/Button/Button";
import { Group } from "@/components/Group";
import { ProPlanCard, RegularPlanCard } from "@/components/HomePage/ProfileText";
import { ContentCard } from "@/components/RoundedBox/RoundedBox";
import { Prices } from "kotilogi-app/constants";
import { getFullPrice } from "kotilogi-app/utils/getFullPrice";
import Link from "next/link";
import { useState } from "react";
import { PaymentForm } from "./PaymentForm";
import { makeOrder } from "kotilogi-app/actions/payments";
import { redirect, useRouter } from "next/navigation";

export function CurrentPlanCard({session}){

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const router = useRouter();
    
    const getNextPayment = () => {
        if(session.user.nextPayment){
            if(session.user.status === 'active'){
                const nextPayment = new Date(session.user.nextPayment);
                console.log(nextPayment);

                return (
                    <>
                        <span className="text-slate-500 text-lg font-semibold">Seuraava maksu</span>
                        <div className="flex gap-4">
                            <span className="font-semibold">{getFullPrice(session.user.plan)}€</span>
                            <span>{session.user.nextPayment}</span>
                        </div>
                    </>
                )
            }
            else if(session.user.status === 'pending'){
                //Return the time left on the pending account.
                const userCreatedDate = new Date(session.user.createdAt).getTime();
                const trialTerminationDate = new Date(userCreatedDate + parseInt(process.env.TRIAL_DURATION)).getTime();
                const timeLeft = (trialTerminationDate - Date.now()) / 1000 / 3600 / 24;


                return (
                    <>
                        <span className="text-slate-500 text-lg font-semibold">Kokeilujaksoa jäljellä</span>
                        <span>{Math.ceil(timeLeft)} päivää.</span>
                    </>
                );
            }
            else{
                return 'Ei seuraavaa maksua';
            }
        }
    }

    const initiatePayment = async () => {
        const paymentToken = await makeOrder(session.user.plan);
        if(paymentToken){
            //router.push(`https://www.vismapay.com/pbwapi/token/${paymentToken.token}`);
        }
    }

    return (
        <ContentCard title="Nykyinen Tilaus">
            <PaymentForm show={showPaymentModal} onHide={() => setShowPaymentModal(false)} id="payment-modal" session={session}/>
            <div className="w-full">
                <Group direction="row" gap={4}>
                    <div className="w-auto">
                        {
                            session.user.plan === 'regular' ? <RegularPlanCard/> : <ProPlanCard/>
                        }
                    </div>

                    <div className="flex flex-col gap-2">
                        {getNextPayment()}
                        <div className="mt-4">
                            <Button variant="primary" onClick={initiatePayment}>
                                <span className="px-4 font-semibold">
                                    Maksa nyt
                                </span>
                            </Button>
                        </div>
                    </div>
                </Group>
            </div>
        </ContentCard>
    );
}