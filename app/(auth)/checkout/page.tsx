import { ProPlanCard, RegularPlanCard } from "@/components/HomePage/ProfileText";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { PlanCards } from "./PlanCards";

export default async function CheckoutPage({searchParams}){
    const session = await getServerSession(options as any) as any;
    
    const getText = () => {
        const cp = searchParams.cp;

        if(cp === 'trial'){
            return (
                <>
                    <span>Kokeilujaksosi on valitettavasti päättynyt, mutta edullisella Kotidok-tilauksella jatkat arvokkaiden talon tietojen kerryttämisen. Valitse itsellesi sopivin ratkaisu.<br/></span>
                    <span className="mt-4">
                        Nykyinen tilauksesi: <span className="font-semibold">{session.user.plan == 'regular' ? 'Perus' : 'Pro'}.</span>
                    </span>
                </>
            );
        }
        else{
            return 'Aloita kotidokin käyttö ja kerrytä arvokasta näyttöä taloon tehdyistä töistä.'
        }
    }
    return (
        <main className="flex flex-row gap-4 w-full flex-1 h-full items-center justify-center">
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-3 text-slate-500">
                    <h1 className="text-2xl font-semibold">Tilaus</h1>
                    <p className="text-lg md:max-w-[700px]">
                        {getText()}
                    </p>
                </div>

                <PlanCards session={session}/>
            </div>
            
        </main>
    );
}