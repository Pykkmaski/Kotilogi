import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading";
import { getServerSession } from "next-auth";
import { UserType } from "kotilogi-app/types/UserType";
import { getFullPrice } from "kotilogi-app/utils/getFullPrice";
import { Prices } from "kotilogi-app/constants";
import { ProPlanCard, RegularPlanCard } from "@/components/HomePage/ProfileText";
import Button from "@/components/Button/Button";
import db from "kotilogi-app/dbconfig";
import { formatNumber } from "kotilogi-app/utils/formatNumber";

export default async function PlanPage(){
    const session = await getServerSession(options as any) as {user: UserType};
    const [bill] = await db('billing').where({customer: session.user.email});

    const getPlanCard = () => {
        if(session.user.plan === 'regular'){
            return <RegularPlanCard/>
        }
        else if(session.user.plan === 'pro'){
            return <ProPlanCard/>
        }
    }

    const getBillDueDate = () => {
        if(!bill) return 'Kokeilujakso';
        
        const nextBill = new Date(bill.timestamp);
        nextBill.setMonth(nextBill.getMonth() + 1);

        return nextBill.toLocaleDateString('fi');
    }

    return (
        <main className="flex flex-col gap-4 mb-8">
            <Header>
                <Heading>Tilaus</Heading>
            </Header>

            <div className="flex flex-row gap-4">
                <div>
                    {getPlanCard()}
                </div>

                <div>
                    <h1 className="text-2xl text-slate-500">Tuleva lasku</h1>
                    <span className="text-lg mt-4">{getBillDueDate()}</span>
                    <Button variant="primary">
                        <span className="mx-4">Peruuta tilaus</span>
                    </Button>
                </div>
            </div>
        </main>
    );
}