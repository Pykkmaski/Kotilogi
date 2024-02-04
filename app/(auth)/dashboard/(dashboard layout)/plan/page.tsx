import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import { Group } from "kotilogi-app/components/Group/Group";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading/Heading";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { ProPlanCard, RegularPlanCard } from "kotilogi-app/components/Pages/Index/ProfileText/ProfileText";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import db from "kotilogi-app/dbconfig";
import { planNameToLang } from "kotilogi-app/utils/translate/planNameToLang";
import { getServerSession } from "next-auth";

export default async function PlanPage(){
    const session = await getServerSession(options) as {user: {email: string}} | null;
    if(!session) throw new Error('Unable to load user session! Try refreshing the page.');

    const [user] = await db('users').where({email: session.user.email}).select('plan', 'email');
    if(!user) throw new Error('Unable to fetch user data! Try refreshing the page.');

    return (
        <main className="w-full flex flex-col gap-4 mb-8">
            <Header>
                <Heading>Tilaus</Heading>
            </Header>
 
            <ContentCard title="Kortti">
                <div className="w-full flex flex-col gap-4">
                    <Input placeholder="Kirjoita haltijan nimi..." label="Haltija" description="Kortin haltija."/>
                    <Group direction="row" align="center" gap={4}>
                        <div className="flex-[5]">
                            <Input name="cardNumber" placeholder="Kortin numero..." label="Numero" description="Kortin numero."/>
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
                        <div className="w-[200px]">
                            {
                                user.plan === 'regular' ? <RegularPlanCard/> : <ProPlanCard/>
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