import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { ChipData } from '@/components/New/ChipData';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { PropertyType } from 'kotilogi-app/models/enums/PropertyType';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/models/types';

type PropertyOverviewProps = {
  property: AppartmentDataType | HouseDataType;
  editIcon: React.ReactNode;
  editUrl: string;
  editContentText: string;
};

export async function PropertyOverview({
  property,
  editIcon,
  editUrl,
  editContentText,
}: PropertyOverviewProps) {
  const [mainImageId] =
    (await db('data_mainImages').where({ objectId: property.id }).pluck('imageId')) || [];

  return (
    <OverviewBox
      title={
        property.streetAddress +
        ' ' +
        (('appartmentNumber' in property && property.appartmentNumber) || '')
      }
      description={
        <div className='flex flex-col h-full gap-4'>
          <Paragraph>{property.description || 'Ei kuvausta.'}</Paragraph>
          <div className='flex flex-col gap-4'>
            <ChipData
              label={property.propertyType == PropertyType.APT ? 'Huoneisto' : 'Kiinteistö'}
              chipColor='primary'
            />
          </div>
        </div>
      }
      imageUrl={'/img/Properties/default-bg.jpg'}
      editUrl={editUrl}
      editContentText={editContentText}
      editIcon={editIcon}
    />
  );
}
