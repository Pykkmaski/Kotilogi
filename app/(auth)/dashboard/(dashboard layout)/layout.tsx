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
import { MediumDevices, SmallDevices } from "@/components/Util/Media";
import { BackgroundFiller } from "@/components/BackgroundFIller";

export default async function DashboardLayout({children}){

    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Käyttäjän lataaminen epäonnistui!');

    return (
        <Layout>
            <Padding>
                <div className="flex gap-4">
                    <div className="xs:hidden md:block flex-1 flex flex-col relative">
                        <Header>
                            <Group direction="col" gap={0}>
                                <SecondaryHeading>{session.user.email}</SecondaryHeading>
                                <h3 className="text-xl">Hallintapaneeli</h3>
                            </Group>
                        </Header>

                        <NavBar>
                            <IconLink imageSrc="/icons/house.png" href="/dashboard/properties">Talot</IconLink>
                            <IconLink imageSrc="/icons/settings.png" href="/dashboard/settings">Asetukset</IconLink>
                        </NavBar>
                    </div>
                    
                    <DashboardContextProvider user={session.user}>
                        <div className="flex-[9] xs:ml-0 md:ml-8 mb-8">
                            {children}
                        </div>
                    </DashboardContextProvider>
                </div>
            </Padding>
        </Layout>
    );
}