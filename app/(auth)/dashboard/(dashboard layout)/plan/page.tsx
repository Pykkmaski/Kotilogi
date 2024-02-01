import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import { Group } from "kotilogi-app/components/Group/Group";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading/Heading";
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
        <main>
            <Header>
                <Heading>Tilaus</Heading>
            </Header>

            <Group direction="col" gap={3}>
                <ContentCard title="Nykyinen Tilaus">
                    <Group direction="row" gap={3} justify="between">
                        <Heading>{planNameToLang(user.plan, 'fi')}</Heading>
                        <PrimaryButton>Muuta</PrimaryButton>
                    </Group>
                </ContentCard>
            </Group>
        </main>
    );
}