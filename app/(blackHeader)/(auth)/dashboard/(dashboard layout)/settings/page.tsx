import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { ContentCard } from "@/components/RoundedBox/RoundedBox";
import { EmailSettingsForm } from "./EmailSettingsForm";
import { PasswordSettingsForm } from "@/components/DashboardPage/SettingsPage/PasswordSettingsForm";
import { Heading } from "@/components/Heading";

export default async function Page(){
    const session = await getServerSession(options as any) as {user: {email: string}};
    if(!session) throw new Error('Käyttäjän varmennus epäonnistui!');
    
    return (
        <main className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <Heading>Tilin asetukset</Heading>
            </div>

            <div className="w-full">
                <ContentCard title="Turvallisuus">
                    <div className="w-full">
                        <EmailSettingsForm email={session.user.email}/>
                        
                        <div className="bg-gray-500 border-t border-gray-200 w-full my-8"/>
                        <PasswordSettingsForm/>
                    </div>
                </ContentCard>
            </div>
        </main>
    )
}