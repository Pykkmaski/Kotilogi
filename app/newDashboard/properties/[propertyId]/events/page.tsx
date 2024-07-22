import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { Visibility } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import Link from 'next/link';

export default async function EventsPage({ params }) {
  const propertyId = params.propertyId;
  const events = await db('propertyEventData')
    .join('objectData', { 'objectData.id': 'propertyEventData.id' })
    .where({ parentId: propertyId });

  return (
    <Main>
      {!events || !events.length ? (
        <span className='text-slate-500'>
          Ei Tapahtumia.{' '}
          <Link
            className='text-teal-500'
            href={`/newDashboard/properties/${propertyId}/events/add`}>
            Lisää Uusi
          </Link>
        </span>
      ) : (
        events.map(event => {
          return (
            <NoUnderlineLink href={`/newDashboard/properties/${propertyId}/events/${event.id}`}>
              <OverviewBox
                title={event.title}
                description={event.description || 'Ei Kuvausta.'}
                imageUrl='/img/Properties/default-bg.jpg'
              />
            </NoUnderlineLink>
          );
        })
      )}
    </Main>
  );
}
