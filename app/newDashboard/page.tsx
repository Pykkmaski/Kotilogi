import { PreviewContentRow, PreviewContentBase } from '@/components/New/Boxes/PreviewContent';
import { IconLink } from '@/components/New/Links/IconLink';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { Menu } from '@/components/New/Menu';
import { Spacer } from '@/components/New/Spacers';
import { Card } from '@/components/UI/Card';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Delete, Edit, History, Home, Image, Settings } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { getUserProperties } from 'kotilogi-app/models/propertyData';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { CardMenuButton } from '@/components/New/CardMenuButton';

export default async function newDashboardPage() {
  const session = await loadSession();
  const properties = await getUserProperties(session.user.id);

  return (
    <Main>
      <PreviewContentRow<AppartmentDataType | HouseDataType>
        icon={<Home />}
        headingText='Talot'
        showAllUrl='/newDashboard/properties'
        addNewUrl='/newDashboard/properties/add'
        itemsToDisplay={3}
        data={properties}
        PreviewComponent={async ({ item }) => {
          const [mainImageId] =
            (await db('data_mainImages').where({ objectId: item.id }).pluck('imageId')) || [];

          return (
            <Card
              href={`newDashboard/properties/${item.id}`}
              title={`${item.streetAddress} ${
                'appartmentNumber' in item ? item.appartmentNumber : ''
              }`}
              description={item.description || 'Ei Kuvausta.'}
              imageSrc={
                (mainImageId && `/api/files/${mainImageId}`) || '/img/Properties/default-bg.jpg'
              }
              HeaderComponent={() => {
                return (
                  <>
                    <Menu trigger={<CardMenuButton />}>
                      <Link href={`/newDashboard/properties/${item.id}/edit`}>Muokkaa</Link>
                      <Link
                        href={`/newDashboard/properties/${item.id}/events`}
                        title='Näytä tapahtumat'>
                        Tapahtumat
                      </Link>
                      <Link
                        href={`/newDashboard/properties/${item.id}/files`}
                        title='Näytä tiedostot'>
                        Tiedostot
                      </Link>
                      <Link
                        title='Poista talo...'
                        href={`/newDashboard/properties/${item.id}/delete`}>
                        Poista
                      </Link>
                    </Menu>
                  </>
                );
              }}
            />
          );
        }}
      />

      <PreviewContentBase
        headingText='Asetukset'
        icon={<Settings />}>
        <form>
          <Spacer direction='col'>
            <FormControl
              label='Sähköposti'
              control={
                <Input
                  type='email'
                  defaultValue={session.user.email}
                />
              }
            />

            <FormControl
              label='Password'
              control={<Input type='password' />}
            />
          </Spacer>
        </form>
      </PreviewContentBase>
    </Main>
  );
}
