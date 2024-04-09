import { NavBar } from "kotilogi-app/components/NavBar/NavBar";
import IconLink from "kotilogi-app/components/IconLink/IconLink";
import { Header } from "kotilogi-app/components/Header/Header";
import { LayoutContentContainer, LayoutNavBarContainer } from "kotilogi-app/components/Layout";
import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { DashboardContextProvider } from "./DashboardContextProvider";
import { Group } from "kotilogi-app/components/Group";
import { DashboardMobileNav } from "./DashboardMobileNav";

export default async function DashboardLayout({children}){

    const session = await getServerSession(options as any) as {user: {email: string}};
    if(!session) throw new Error('Käyttäjän lataaminen epäonnistui!');

    return (
        <div className="flex gap-4 w-full flex-1">
            <LayoutNavBarContainer>
                <Header>
                    <Group direction="col" gap={0}>
                      
                        <span className="text-white text-sm">{session.user.email}</span>
                        <h3 className="text-xl text-white">Hallintapaneeli</h3>
                    </Group>
                </Header>

                <NavBar>
                    <div className="text-white">
                        <IconLink imageSrc="/icons/house.png" icon="fa-home" href="/dashboard/properties">Talot</IconLink>
                        <IconLink imageSrc="/icons/settings.png" icon="fa-cog" href="/dashboard/settings">Asetukset</IconLink>
                        <IconLink imageSrc="/icons/cart.png" icon="fa-shopping-cart" href="/dashboard/cart">Ostoskori</IconLink>
                    </div>
                </NavBar>
            </LayoutNavBarContainer>
            
            <DashboardContextProvider user={session.user}>
                <LayoutContentContainer>
                    {children}
                    <DashboardMobileNav/>
                </LayoutContentContainer>
            </DashboardContextProvider>
        </div>
    );
}