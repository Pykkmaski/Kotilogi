import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Visibility } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';
import { EventOverview } from './_components/EventOverview';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { SearchBar } from '@/components/Feature/SearchBar';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';

async function getEvents(propertyId: string, q: string | undefined, page?: number) {
  const table = 'data_propertyEvents';

  if (!q || q == 'null') {
    return await db(table)
      .join('data_objects', 'data_objects.id', '=', 'data_propertyEvents.id')
      .where({ parentId: propertyId });
  }

  const query = `%${q}%`;
  const events: EventDataType = await db(table)
    .join('data_objects', 'data_objects.id', '=', 'data_propertyEvents.id')
    .where(function () {
      this.whereLike('time', query).orWhereLike('title', query).orWhereLike('description', query);
    })
    .andWhere({ parentId: propertyId })
    .orderBy('time', 'desc');

  return events;
}

export default async function EventsPage({ params, searchParams }) {
  const propertyId = params.propertyId;
  const search = searchParams?.q;

  const events = (await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where(function () {
      this.whereLike('title', `%${search}`)
        .orWhereLike('description', `%${search}%`)
        .orWhereLike('startTime', `%${search}%`)
        .orWhereLike('endTime', `%${search}%`);
    })
    .andWhere({ parentId: propertyId })
    .orderBy('startTime', 'desc')) as EventDataType[];

  const [propertyType] = await db('data_properties')
    .where({ id: propertyId })
    .pluck('propertyType');
  const [propertyAddress] =
    propertyType == PropertyType.HOUSE
      ? await db('data_properties').select('streetAddress')
      : await db('data_properties')
          .join('data_appartments', { 'data_properties.id': 'data_appartments.id' })
          .select('streetAddress', 'appartmentNumber');

  console.log(propertyAddress);
  return (
    <Main>
      <OverviewBoxList
        searchBar
        listTitle='Tapahtumat'
        onEmptyElement={
          search ? (
            <GalleryError
              title='Ei osumia'
              message={`Haulla '${search}' ei löytynyt tapahtumia.`}
              icon={'fa fa-history'}
            />
          ) : (
            <GalleryError
              title='Ei tapahtumia'
              message='Kohteelle ei ole vielä lisätty tapahtumia'
              icon='fa fa-history'
            />
          )
        }
        items={events}
        addButtonUrl={`/newDashboard/properties/${propertyId}/events/add`}
        OverviewComponent={async ({ item }) => {
          const [{ numSteps }] = await db('data_propertyEventSteps')
            .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })

            .where({ parentId: item.id })
            .count('*', { as: 'numSteps' });

          return (
            <EventOverview
              event={{
                ...item,
                numSteps,
              }}
            />
          );
        }}
      />
    </Main>
  );
}
