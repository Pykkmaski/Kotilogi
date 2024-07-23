import { PreviewContentRow, PreviewContentBase } from '@/components/New/Boxes/PreviewContent';
import { IconLink } from '@/components/New/Links/IconLink';
import { NoUnderlineLink } from '@/components/New/Links/NoUnderlineLink';
import { Main } from '@/components/New/Main';
import { Spacer } from '@/components/New/Spacers';
import { Card } from '@/components/UI/Card';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Delete, History, Home, Settings } from '@mui/icons-material';
import { getUserAppartments } from 'kotilogi-app/models/appartmentData';
import { getUserHouses } from 'kotilogi-app/models/houseData';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export default async function newDashboardPage() {
  const session = await loadSession();
  const houses = await getUserHouses(session.user.id);
  const appartments = await getUserAppartments(session.user.id);
  const properties = [...houses, ...appartments];

  return (
    <Main>
      <Spacer direction='col'>
        <PreviewContentRow<AppartmentDataType | HouseDataType>
          icon={<Home />}
          headingText='Talot'
          showAllUrl='/newDashboard/properties'
          addNewUrl='/newDashboard/properties/add'
          itemsToDisplay={3}
          data={properties}
          PreviewComponent={({ item }) => (
            <NoUnderlineLink href={`/newDashboard/properties/${item.id}`}>
              <Card
                title={`${item.streetAddress} ${
                  'appartmentNumber' in item ? item.appartmentNumber : ''
                }`}
                description={item.description || 'Ei Kuvausta.'}
                imageSrc='/img/Properties/default-bg.jpg'
                HeaderComponent={() => {
                  return (
                    <>
                      <IconLink
                        icon={<Delete sx={{ color: 'white' }} />}
                        title='Poista talo...'
                        href={`/newDashboard/properties/${item.id}/delete`}
                      />
                      <IconLink
                        href={`/newDashboard/properties/${item.id}/events`}
                        title='Näytä tapahtumat'
                        icon={<History sx={{ color: 'white' }} />}
                      />
                    </>
                  );
                }}
              />
            </NoUnderlineLink>
          )}
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
      </Spacer>
    </Main>
  );
}
