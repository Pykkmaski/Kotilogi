import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import {PrimaryButton} from "kotilogi-app/components/Button/PrimaryButton";
import { Group } from "kotilogi-app/components/Group";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { ProPlanCard, RegularPlanCard } from "kotilogi-app/components/HomePage/ProfileText";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import db from "kotilogi-app/dbconfig";
import { planNameToLang } from "kotilogi-app/utils/translate/planNameToLang";
import { getServerSession } from "next-auth";
import { MakePaymentButton } from "kotilogi-app/components/BillingPage/MakePaymentButton";
import { PaymentType } from "kotilogi-app/types/PaymentType";
import { UserType } from "kotilogi-app/types/UserType";
import Button from "@/components/Button/Button";
import { getFullPrice } from "kotilogi-app/utils/getFullPrice";
import { Prices } from "kotilogi-app/constants";
import Link from "next/link";

async function getLatestPendingPayment(userEmail: string): Promise<PaymentType | null>{
    try{
        const payment = await db('payments').where({userEmail}).first() as PaymentType;
        return payment;
    }
    catch(err: any){
        console.log(err.message);
        return null;
    }
}

export default async function PlanPage(){
    const session = await getServerSession(options) as {user: UserType};
    if(!session) throw new Error('Unable to load user session! Try refreshing the page.');

    const payments = [];

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
                        <span className="text-sm text-slate-500">Sisältää ALV {Prices.TAX * 100}%</span>
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

    const getPayments = () => {
        if(payments.length){
            return (
                <div className="flex flex-column justify-between items-center gap-2">
                    {payments}
                </div>
            );
        }
        else{
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-slate-500">Ei suoritettuja maksuja.</span>
                </div>
            );
        }
    }

    return (
        <main className="w-full flex flex-col gap-4 mb-8">
            <Header>
                <Heading>Laskutus</Heading>
            </Header>
            
            <div className="flex flex-row gap-4">
                <div className="flex-1">
                    <ContentCard title="Nykyinen Tilaus">
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
                                        <Link href="https://duckduckgo.com" target="_blank">
                                            <Button variant="primary">
                                                <span className="px-4 font-semibold">
                                                    Maksa nyt
                                                </span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Group>
                        </div>
                    </ContentCard>
                </div>
                
                <div className="flex-1">
                    <ContentCard title="Menneet Maksut">
                        {getPayments()}
                    </ContentCard>
                </div>
                
            </div>
        </main>
    );
}