import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { LabelGrid } from '@/components/New/LabelGrid';
import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { EventStepDataType } from 'kotilogi-app/models/types';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';
import { StepOverview } from './StepOverview';

export default async function StepsPage({ params, searchParams }) {
  const search = searchParams?.q;

  const [eventTitle] = await db('data_objects').where({ id: params.eventId }).pluck('title');
  const steps = (await db('data_objects')
    .join('data_propertyEventSteps', { 'data_propertyEventSteps.id': 'data_objects.id' })
    .where(function () {
      const query = `%${search}%`;
      this.whereLike('title', query).orWhereLike('description', query);
    })
    .andWhere({ parentId: params.eventId })) as EventStepDataType[];

  return (
    <Main>
      <OverviewBoxList
        searchBar
        listTitle={`Vaiheet`}
        items={steps}
        onEmptyElement={
          <GalleryError
            title='Ei tuloksia'
            message={`Haulla '${search}' ei löytynyt vaiheita.`}
            icon={'fa fa-tag'}
          />
        }
        addButtonUrl='steps/add'
        OverviewComponent={async ({ item }) => {
          return (
            <StepOverview
              step={item}
              showEnabled
            />
          );
        }}
      />
    </Main>
  );
}
