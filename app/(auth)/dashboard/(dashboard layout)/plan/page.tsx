import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading";
import { getServerSession } from "next-auth";
import { UserType } from "kotilogi-app/types/UserType";
import { getFullPrice } from "kotilogi-app/utils/getFullPrice";
import { Prices } from "kotilogi-app/constants";

export default async function PlanPage(){
    const session = await getServerSession(options as any) as {user: UserType};
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
                <Heading>Tilaus</Heading>
            </Header>

            <span>Tulossa</span>
        </main>
    );
}