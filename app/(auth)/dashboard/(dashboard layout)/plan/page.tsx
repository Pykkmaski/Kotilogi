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
    const session = await getServerSession(options) as {user: {email: string}} | null;
    if(!session) throw new Error('Unable to load user session! Try refreshing the page.');

    const [user] = await db('users').where({email: session.user.email}).select('plan', 'email', 'nextPayment');
    if(!user) throw new Error('Unable to fetch user data! Try refreshing the page.');

    const payment = await getLatestPendingPayment(user.email);

    return (
        <main className="w-full flex flex-col gap-4 mb-8">
            <Header>
                <Heading>Laskutus</Heading>
            </Header>
 
            <ContentCard title="Kortti">
                <div className="w-full flex flex-col gap-4">
                    <Input placeholder="Kirjoita haltijan nimi..." label="Haltija" description="Kortin haltija."/>
                    <Group direction="row" align="center" gap={4}>
                        <div className="flex-[7]">
                            <input name="cardNumber" placeholder="Kirjoita kortin numero..."/>
                        </div>

                        <div className="flex-[1]">
                            <input maxLength={3} name="securityNumber" placeholder="Kirjoita turvanumero..." className="rounded-[10px] border border-gray min-h-[3rem] pl-2 pr-2"/>
                        </div>
                    </Group>
                    <Select label="Maa" description="Valitse kortinhaltijan maa.">
                        <option selected disabled>Valitse Maa</option>
                        <option value="Finland">Suomi</option>
                    </Select>
                </div>
            </ContentCard>

            <ContentCard title="Nykyinen Tilaus">
                <div className="w-full">
                    <Group direction="row" gap={4}>
                        <div className="w-auto">
                            {
                                user.plan === 'regular' ? <RegularPlanCard/> : <ProPlanCard/>
                            }
                        </div>

                        <div className="w-full flex flex-col text-slate-500">
                            {
                                payment && Date.now() >= parseInt(payment.dueDate) ? 
                                <>
                                    <h1 className="text-2xl">Vahvistamaton Lasku</h1>
                                    <span className="text-4xl mb-2">{(payment.amount / 100).toFixed(2)}€</span>
                                    <span className="text-sm">Laskutuskaudelta {new Date(parseInt(payment.dueDate)).getFullYear() - 1}</span>

                                    <div className="w-[30%] mt-4">
                                        <MakePaymentButton/>
                                    </div>
                                </>
                                :
                                payment ? 
                                <>
                                    <h1 className="text-2xl">Tuleva Lasku</h1>
                                    <span className="text-4xl mb-2">{payment.amount / 100}</span>
                                    <span className="text-sm">
                                        {new Date(payment.dueDate).toLocaleDateString('fi')}
                                    </span>
                                </>
                                :
                                <span>Seuraavan maksun lataus epäonnistui.</span>
                            }
                            
                        </div>
                    </Group>
                    
                    <div className="mt-4">
                        <Group direction="row" gap={3} justify="end">
                            <PrimaryButton className="w-[100px] flex justify-center">Muuta</PrimaryButton>
                        </Group>
                    </div>
                </div>
            </ContentCard>
            
        </main>
    );
}