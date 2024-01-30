import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import { NavBar } from "kotilogi-app/components/NavBar/NavBar";
import IconLink from "kotilogi-app/components/IconLink/IconLink";
import { Header } from "kotilogi-app/components/Header/Header";
import { Layout } from "kotilogi-app/components/Layout/Layout";
import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { DashboardContextProvider } from "./DashboardContextProvider";
import { SecondaryHeading } from "kotilogi-app/components/Heading/Heading";
import { Group } from "kotilogi-app/components/Group/Group";
import { Accordion } from "kotilogi-app/components/Experimental/Accordion/Accordion";
import Link from "next/link";

export default async function DashboardLayout({children}){

    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Käyttäjän lataaminen epäonnistui!');

    return (
        <Layout>
            <Header>
                <Group direction="vertical" gap="0">
                    <SecondaryHeading>{session.user.email}</SecondaryHeading>
                    <h3>Hallintapaneeli</h3>
                </Group>
                
            </Header>
            <SplitScreen rightWeight={9} gap="1rem">
                <NavBar>
                    <IconLink imageSrc="/icons/house.png" href="/dashboard/properties">Talot</IconLink>
                    <IconLink imageSrc="/icons/settings.png" href="/dashboard/settings">Asetukset</IconLink>
                    <IconLink imageSrc="/icons/user.png" href="/dashboard/plan">Tilaus</IconLink>
                </NavBar>

                <DashboardContextProvider user={session.user}>
                    {children}
                </DashboardContextProvider>
            </SplitScreen>
        </Layout>
    );
}