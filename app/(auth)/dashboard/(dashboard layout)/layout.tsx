import { NavBar } from "kotilogi-app/components/NavBar/NavBar";
import IconLink from "kotilogi-app/components/IconLink/IconLink";
import { Header } from "kotilogi-app/components/Header/Header";
import { Layout } from "kotilogi-app/components/Layout";
import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { DashboardContextProvider } from "./DashboardContextProvider";
import { SecondaryHeading } from "kotilogi-app/components/Heading";
import { Group } from "kotilogi-app/components/Group";
import { Padding } from "@/components/Util/Padding";

export default async function DashboardLayout({children}){

    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Käyttäjän lataaminen epäonnistui!');

    return (
        <Layout>
            <Padding>
                <Header>
                    <Group direction="col" gap={0}>
                        <SecondaryHeading>{session.user.email}</SecondaryHeading>
                        <h3 className="text-xl">Hallintapaneeli</h3>
                    </Group>
                </Header>

                <Group direction={'row'} gap={4}>
                    <NavBar>
                        <IconLink imageSrc="/icons/house.png" href="/dashboard/properties">Talot</IconLink>
                        <IconLink imageSrc="/icons/settings.png" href="/dashboard/settings">Asetukset</IconLink>
                    </NavBar>
                    
                    <DashboardContextProvider user={session.user}>
                        <div className="flex-[9] ml-8 mb-8">
                            {children}
                        </div>
                    </DashboardContextProvider>
                </Group>
            </Padding>
        </Layout>
    );
}