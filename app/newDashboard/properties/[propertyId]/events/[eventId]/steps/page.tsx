import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';

export default async function StepsPage({ params, searchParams }) {
  const search = searchParams?.q;

  const [eventTitle] = await db('data_objects').where({ id: params.eventId }).pluck('title');
  const steps = await db('data_objects')
    .join('data_propertyEventSteps', { 'data_propertyEventSteps.id': 'data_objects.id' })
    .where(function () {
      const query = `%${search}%`;
      this.whereLike('title', query).orWhereLike('description', query);
    })
    .andWhere({ parentId: params.eventId });

  return (
    <Main>
      <OverviewBoxList
        searchBar
        listTitle={`Vaiheet (${eventTitle})`}
        items={steps}
        onEmptyElement={
          <GalleryError
            title='Ei tuloksia'
            message={`Haulla '${search}' ei löytynyt vaiheita.`}
            icon={'fa fa-pin'}
          />
        }
        addButtonUrl='steps/add'
        OverviewComponent={async ({ item }) => {
          const [mainImageId] = await db('data_mainImages')
            .where({ objectId: item.id })
            .pluck('imageId');

          return (
            <OverviewBox
              title={item.title}
              description={item.description}
              showUrl={`steps/${item.id}`}
              deleteUrl={`steps/${item.id}/delete`}
              editContentText='Muokkaa'
              editIcon={<Edit />}
              editUrl={`steps/${item.id}/edit`}
              imageUrl={(mainImageId && `/api/files/${mainImageId}`) || '/img/room.jpg'}
            />
          );
        }}
      />
    </Main>
  );
}
