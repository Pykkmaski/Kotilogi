import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import { NavBar } from "kotilogi-app/components/NavBar/NavBar";
import IconLink from "kotilogi-app/components/IconLink/IconLink";
import { Header } from "kotilogi-app/components/Header/Header";
import { Layout } from "kotilogi-app/components/Layout/Layout";
import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { DashboardContextProvider } from "./DashboardContextProvider";

export default async function DashboardLayout({children}){

    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Käyttäjän lataaminen epäonnistui!');

    return (
        <Layout>
            <Header>
                <h3>Hallintapaneeli</h3>
            </Header>
            <SplitScreen rightWeight={9} gap="1rem">
                <NavBar>
                    <IconLink imageSrc="/icons/house.png" href="/dashboard/properties">Talot</IconLink>
                    <IconLink imageSrc="/icons/settings.png" href="/dashboard/settings">Asetukset</IconLink>
                </NavBar>

                <DashboardContextProvider user={session.user}>
                    {children}
                </DashboardContextProvider>
            </SplitScreen>
        </Layout>
    );
}