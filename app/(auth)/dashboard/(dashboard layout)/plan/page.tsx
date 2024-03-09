import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading";
import { getServerSession } from "next-auth";
import { UserType } from "kotilogi-app/types/UserType";
import { ProPlanCard, RegularPlanCard } from "@/components/HomePage/ProfileText";
import db from "kotilogi-app/dbconfig";
import { CancelSubscriptionButton } from "./CancelSubscriptionButton";
import { RoundedBox } from "@/components/RoundedBox/RoundedBox";
import { formatNumber } from "kotilogi-app/utils/formatNumber";
import Button from "@/components/Button/Button";

const BillItem = ({bill}) => {
    return (
        <div className="w-full rounded-md shadow-md flex flex-row">

        </div>
    );
} 

export default async function PlanPage(){
    const session = await getServerSession(options as any) as {user: UserType};
    const bills = await db('billing').where({customer: session.user.email});
    const due = bills.at(0)?.due;

    const dueDate = due ? new Date(parseInt(due)) : null;
    const totalBill = bills.reduce((acc, cur) => acc += cur.amount, 0);

    return (
        <main className="flex flex-col gap-4 mb-8">
            <Header>
                <Heading>Lasku</Heading>
            </Header>

            <div className="flex gap-10 items-end">
                <div className="flex flex-col">
                    <span className="text-slate-500">Tämän kuun lasku:</span>
                    <span className="text-lg">{dueDate?.toLocaleDateString('fi')}</span>
                </div>

                <span className="text-2xl text-green-600">
                    {formatNumber(totalBill / 100)}€
                </span>
            </div>

            <div className="mt-8">
                <span className="text-slate-500">Maksun hoitaa PayTrail.</span>
                <div className="w-full justify-end">
                    <Button variant="primary">
                        <span className="mx-8">Maksa Nyt</span>
                    </Button>
                </div>
            </div>
            
        </main>
    );
}