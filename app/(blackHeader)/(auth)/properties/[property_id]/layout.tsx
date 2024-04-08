import db from 'kotilogi-app/dbconfig';
import PropertyContextProvider from './_util/PropertyContextProvider';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { NavBar } from 'kotilogi-app/components/NavBar/NavBar';
import IconLink from 'kotilogi-app/components/IconLink/IconLink';
import { Header } from 'kotilogi-app/components/Header/Header';
import { LayoutContentContainer, LayoutNavBarContainer, NavDivider } from 'kotilogi-app/components/Layout';
import { Group } from 'kotilogi-app/components/Group';
import { SecondaryHeading } from 'kotilogi-app/components/Heading';
import { FooterNav } from '@/components/FooterNav';
import Link from 'next/link';

export default async function PropertyDetailsLayout({children, params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Failed to load property!');

    const session = await getServerSession(options as any) as {user: {email: string}};
    if(!session) throw new Error('Failed to fetch user session!');

    if(session.user.email !== property.refId) throw new Error('property_unauthorized');
    
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
                            <IconLink icon="fa-angle-double-up" imageSrc={''} href="transfer">Siirä omistajuus</IconLink>
                            <NavDivider/>
                    
                            <IconLink icon="fa-home" imageSrc={'/icons/house.png'} href={`/dashboard/properties/`}>Takaisin Taloihin</IconLink>
                        </div>
                        
                    </NavBar>
                </LayoutNavBarContainer>
                
                <LayoutContentContainer>
                    {children}
                    <FooterNav>
                        <Link href="info">
                            <i className="fa fa-info-circle"/>
                        </Link>

                        <Link href="events">
                            <i className="fa fa-history"/>
                        </Link>

                        <Link href="usage?type=all">
                            <i className="fa fa-bolt"/>
                        </Link>

                        <Link href="images">
                            <i className="fa fa-image"/>
                        </Link>

                        <Link href="files">
                            <i className="fa fa-copy"/>
                        </Link>

                        <Link href="transfer">
                            <i className="fa fa-angle-double-up"/>
                        </Link>
                    </FooterNav>
                </LayoutContentContainer>
            </div>
        </PropertyContextProvider>
    );
}