import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading";
import { getServerSession } from "next-auth";
import { UserType } from "kotilogi-app/types/UserType";
import db from "kotilogi-app/dbconfig";
import { Bills } from "./Bills";
import { Banner } from "./Banner";

export default async function CartPage(){
    const session = await getServerSession(options as any) as {user: UserType};
    const bills = await db('bills').where({customer: session.user.email});

    return (    
        <main className="flex flex-col gap-4 mb-10">
            <Header>
                <Heading>Ostoskori</Heading>
            </Header>
            <Banner/>
            <Bills bills={bills}/>
        </main>
    );
}