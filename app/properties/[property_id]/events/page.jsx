import { getServerSession } from 'next-auth';
import EventsGallery from './_components/EventsGallery';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import GalleryProvider from 'kotilogi-app/contexts/GalleryProvider';
import { redirect } from 'next/dist/server/api-utils';

export default async function PropertyEventsPage({params}){
    const session = await getServerSession(options);
    const {property_id} = params;

    return (
        <GalleryProvider apiRoute={`/api/user/${session.user.email}/properties/${property_id}/events/`}>
            <EventsGallery />
        </GalleryProvider>
    )
}