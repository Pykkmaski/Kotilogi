import db from 'kotilogi-app/dbconfig';
import PropertyContextProvider from './_util/PropertyContextProvider';
import { isUserTheOwnerOfProperty } from 'kotilogi-app/actions/property/isUserTheOwnerOfProperty';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { NavBar } from 'kotilogi-app/components/NavBar/NavBar';
import IconLink from 'kotilogi-app/components/IconLink/IconLink';
import { Header } from 'kotilogi-app/components/Header/Header';
import { LayoutContentContainer, LayoutNavBarContainer, NavDivider } from 'kotilogi-app/components/Layout';
import { Group } from 'kotilogi-app/components/Group';
import { SecondaryHeading } from 'kotilogi-app/components/Heading';

export default async function PropertyDetailsLayout({children, params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Failed to load property!');

    const session = await getServerSession(options as any) as {user: {email: string}};
    if(!session) throw new Error('Failed to fetch user session!');

    const isLoggedInUserTheOwner = await isUserTheOwnerOfProperty(session.user.email, property.id);
    if(!isLoggedInUserTheOwner) throw new Error('property_unauthorized');
    
    const contextValue = {
        property,
    }

    return (
        <PropertyContextProvider value={contextValue}>
            <div className="flex flex-row gap-2 w-full flex-1">
                <LayoutNavBarContainer>
                    <Header>
                        <Group direction="col">
                            <SecondaryHeading>
                                <span className="text-white">Talo</span>
                            </SecondaryHeading>
                            <span className="text-white text-xl">{property.title}</span>
                        </Group>
                    </Header>

                    <NavBar>
                        <div className="text-white">
                            <IconLink icon="fa-info-circle" imageSrc={'/icons/info.png'} href='info?section=general'>Tiedot</IconLink>
                            <IconLink icon="fa-history" imageSrc={'/icons/history.png'} href="events">Tapahtumat</IconLink>
                            <IconLink icon="fa-bolt" imageSrc={'/icons/bolt.png'} href="usage?type=all">Kulutustiedot</IconLink>
                            <IconLink icon="fa-image" imageSrc={'/icons/image.png'} href="images">Kuvat</IconLink>
                            <IconLink icon="fa-copy" imageSrc={'/icons/copy.png'} href="files">Tiedostot</IconLink>
                            <NavDivider/>
                    
                            <IconLink icon="fa-home" imageSrc={'/icons/house.png'} href={`/dashboard/properties/`}>Takaisin Taloihin</IconLink>
                        </div>
                        
                    </NavBar>
                </LayoutNavBarContainer>
                
                <LayoutContentContainer>
                    {children}
                </LayoutContentContainer>
            </div>
        </PropertyContextProvider>
    );
}