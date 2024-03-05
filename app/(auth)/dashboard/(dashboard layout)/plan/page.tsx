import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading";
import { getServerSession } from "next-auth";
import { UserType } from "kotilogi-app/types/UserType";
import { ProPlanCard, RegularPlanCard } from "@/components/HomePage/ProfileText";
import db from "kotilogi-app/dbconfig";
import { CancelSubscriptionButton } from "./CancelSubscriptionButton";
import { RoundedBox } from "@/components/RoundedBox/RoundedBox";

const BillItem = ({bill}) => {
    return (
        <div className="w-full rounded-md shadow-md flex flex-row">

        </div>
    );
} 

export default async function PlanPage(){
    const session = await getServerSession(options as any) as {user: UserType};
    const [bill] = await db('billing').where({customer: session.user.email});
    const billDueDate = bill ? new Date(parseInt(bill.timestamp)) : null;

    const getPlanCard = () => {
        if(session.user.plan === 'regular'){
            return <RegularPlanCard/>
        }
        else if(session.user.plan === 'pro'){
            return <ProPlanCard/>
        }
    }

    const getBillDueDate = () => {
        if(!billDueDate) return 'Kokeilujakso';

        return billDueDate.toLocaleDateString('fi');
    }

    console.log(billDueDate?.toLocaleDateString('fi'));
    return (
        <main className="flex flex-col gap-4 mb-8">
            <Header>
                <Heading>Tilaus</Heading>
            </Header>

            <div className="flex gap-2">
                <div className="flex-1">
                    <RoundedBox>
                        <div className="flex flex-row gap-4">
                            <div>
                                {getPlanCard()}
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-2xl text-slate-500">Tuleva lasku</h1>
                                <span className="text-lg mt-4">{getBillDueDate()}</span>
                                <div className="mt-4">
                                    <CancelSubscriptionButton user={session.user} disabled={billDueDate ? Date.now() >= billDueDate.getTime() : false}/>
                                </div>
                            </div>
                        </div>
                    </RoundedBox>
                </div>
            </div>
        </main>
    );
}