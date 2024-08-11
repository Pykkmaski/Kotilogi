import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import db from 'kotilogi-app/dbconfig';
import { EventDataType } from 'kotilogi-app/models/types';
import { EventOverview } from './_components/EventOverview';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { getRefTableContent } from '@/actions/util/getRefTableContent';

export default async function EventsPage({ params, searchParams }) {
  const propertyId = params.propertyId;
  const search = searchParams?.q;
  const [events, [propertyTypeId]] = (await Promise.all([
    db('data_propertyEvents')
      .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
      .where(function () {
        const query = `%${search}%`;
        this.where('data_objects.title', 'ilike', query).orWhereLike(
          'data_objects.description',
          query
        );
      })
      .andWhere({ parentId: propertyId })
      .orderBy('startTime', 'desc'),

    db('data_properties').where({ id: propertyId }).pluck('propertyTypeId'),
  ])) as [EventDataType[], [number]];

  const propertyTypes = await getRefTableContent('ref_propertyTypes');

  const [propertyAddress] =
    propertyTypeId == propertyTypes['Kiinteistö']
      ? await db('data_properties').where({ id: propertyId }).select('streetAddress')
      : await db('data_properties')
          .join('data_appartments', { 'data_properties.id': 'data_appartments.id' })
          .where({ id: propertyId })
          .select('streetAddress', 'appartmentNumber');

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
