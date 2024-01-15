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
import { Layout } from 'kotilogi-app/components/Layout/Layout';
import { Group } from 'kotilogi-app/components/Group/Group';
import { SecondaryHeading } from 'kotilogi-app/components/Heading/Heading';

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
                <Header>
                    <Group direction="vertical" gap="0">
                        <SecondaryHeading>Talo</SecondaryHeading>
                        <h3>{property.title}</h3>
                    </Group>
                    
                </Header>
                <SplitScreen rightWeight={7} gap="1rem">
                    <NavBar>
                        <IconLink imageSrc={'/icons/info.png'} href='info?section=general'>Tiedot</IconLink>
                        <IconLink imageSrc={'/icons/history.png'} href="events">Tapahtumat</IconLink>
                        <IconLink imageSrc={'/icons/bolt.png'} href="usage?data=heat" style={{textDecoration: 'line-through'}}>Kulutustiedot</IconLink>
                        <IconLink imageSrc={'/icons/image.png'} href="images">Kuvat</IconLink>
                        <IconLink imageSrc={'/icons/copy.png'} href="files">Tiedostot</IconLink>

                        <Link href={`/dashboard/properties/`}>Takaisin Taloihin</Link>
                    </NavBar>
                    {children}
                </SplitScreen>
           </Layout>
        </PropertyContextProvider>
    );
}