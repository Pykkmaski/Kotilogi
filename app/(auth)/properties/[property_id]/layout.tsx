import db from 'kotilogi-app/dbconfig';
import PropertyContextProvider from './_util/PropertyContextProvider';
import { isUserTheOwnerOfProperty } from 'kotilogi-app/actions/property/isUserTheOwnerOfProperty';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { SplitScreen } from 'kotilogi-app/components/SplitScreen/SplitScreen';
import { NavBar } from 'kotilogi-app/components/NavBar/NavBar';
import IconLink from 'kotilogi-app/components/IconLink/IconLink';
import Link from 'next/link';
import { Header } from 'kotilogi-app/components/Header/Header';
import { Layout } from 'kotilogi-app/components/Layout';
import { Group } from 'kotilogi-app/components/Group';
import { Heading, SecondaryHeading } from 'kotilogi-app/components/Heading';
import { Flex } from 'kotilogi-app/components/Util/Flex';
import { Padding } from '@/components/Util/Padding';
import { MediumDevices } from '@/components/Util/Media';
import { BackgroundFiller } from '@/components/BackgroundFIller';

export default async function PropertyDetailsLayout({children, params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Failed to load property!');

    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Failed to fetch user session!');

    const isLoggedInUserTheOwner = await isUserTheOwnerOfProperty(session.user.email, property.id);
    if(!isLoggedInUserTheOwner) throw new Error('You are not allowed to view this property!');
    
    const contextValue = {
        property,
    }

    return (
        <PropertyContextProvider value={contextValue}>
           <Layout>
                <Padding>
                    <Group gap={1} direction="row">
                        <div className="sm:hidden md:block flex-1 flex flex-col relative">
                            <Header>
                                <Group direction="col">
                                    <SecondaryHeading>Talo</SecondaryHeading>
                                    <span className="text-black text-xl">{property.title}</span>
                                </Group>
                            </Header>

                            <NavBar>
                                <IconLink imageSrc={'/icons/info.png'} href='info?section=general'>Tiedot</IconLink>
                                <IconLink imageSrc={'/icons/history.png'} href="events">Tapahtumat</IconLink>
                                <IconLink imageSrc={'/icons/bolt.png'} href="usage?type=heat">Kulutustiedot</IconLink>
                                <IconLink imageSrc={'/icons/image.png'} href="images">Kuvat</IconLink>
                                <IconLink imageSrc={'/icons/copy.png'} href="files">Tiedostot</IconLink>
                                
                                <div className="bg-slate-300 h-[1px] w-full mt-4 mb-4"></div>
                            
                                <IconLink imageSrc={'/icons/house.png'} href={`/dashboard/properties/`}>Takaisin Taloihin</IconLink>
                            </NavBar>
                        </div>
                        
                        <Flex value={8}>
                            <div className="sm:ml-0 md:ml-8 mb-8">
                                {children}
                            </div>
                        </Flex>
                    </Group>
                </Padding>
           </Layout>
        </PropertyContextProvider>
    );
}