import { Main } from '@/components/New/Main';
import { Add, Edit, MoreVert, Visibility } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { FileCard } from '@/components/New/FileCard';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { UtilityProvider } from './utility/UtilityContext';
import { properties } from 'kotilogi-app/dataAccess/properties';
import { utilities } from 'kotilogi-app/dataAccess/utilities';
import { files } from 'kotilogi-app/dataAccess/files';
import { BoxFieldset } from '@/components/UI/Fieldset';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { events } from 'kotilogi-app/dataAccess/events';
import { Card } from '@/components/UI/Card';
import { UtilityLineChart } from './utility/UtilityLineChart';
import { DataDisplay } from '@/components/UI/DataDisplay';
import { DialogPrefab } from '@/components/UI/VPDialog';
import { SelectImageDialog } from '@/components/Feature/SelectImageDialog/SelectImageDialog';
import { heating } from 'kotilogi-app/dataAccess/heating';
import { MenuPrefab, VPMenu } from '@/components/UI/VPMenu';
import { TransferDialogTrigger } from './_components/TransferDialogTrigger';

export default async function PropertyPage({ params }) {
  const id = params.propertyId;
  const data = await properties.get(id);
  const eventData = await events.get({ parentId: id }, null, 10);

  //Fetch additional data back-to-back to conserve db connection pool.
  const owners = await db('data_propertyOwners')
    .where({ propertyId: data.id })
    .join('data_users', { 'data_users.id': 'data_propertyOwners.userId' })
    .pluck('email');

  const utilityData = await utilities.get(data.id);
  const fileData = await files.get({ parentId: id }, 10);
  const [mainImageId] = await db('data_mainImages').where({ objectId: data.id }).pluck('imageId');
  const primaryHeating = await heating.getPrimary(id, db);

  return (
    <Main>
      <SecondaryHeading>Talo</SecondaryHeading>
      <BoxFieldset legend='Yleiskatsaus'>
        <div
          className='flex md:flex-row xs:flex-col-reverse md:gap-4 xs:gap-8 w-full'
          id='overview-box-body'>
          <div
            className='flex flex-col gap-10 w-full h-full'
            id='overview-box-information-container'>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4'>
                <h1 className='md:text-xl xs:text-lg font-semibold'>
                  {data.street_name + ' ' + data.street_number}
                </h1>
                <div className='flex'>
                  <Link href={`/dashboard/properties/${data.id}/edit`}>
                    <IconButton
                      size='small'
                      title='Muokkaa'>
                      <Edit />
                    </IconButton>
                  </Link>

                  <MenuPrefab
                    trigger={
                      <IconButton size='small'>
                        <MoreVert />
                      </IconButton>
                    }
                    target={
                      <VPMenu>
                        <Link href={`/dashboard/properties/${data.id}/report`}>Luo raportti</Link>
                        <TransferDialogTrigger propertyId={data.id} />
                        <Link href={`/dashboard/properties/${data.id}/delete`}>Poista</Link>
                      </VPMenu>
                    }></MenuPrefab>
                </div>
              </div>

              <p>{data.description || 'Ei kuvausta.'}</p>
            </div>

            <div className='flex flex-col gap-2'>
              <h1 className='font-semibold text-slate-500 mb-2'>Tiedot</h1>
              <DataDisplay
                title='Kiinteistötyyppi'
                value={data.propertyTypeName}
              />

              <DataDisplay
                title='Huoneiden lukumäärä'
                value={data.room_count || 'Ei määritelty'}
              />

              <DataDisplay
                title={data.propertyTypeName == 'Huoneisto' ? 'Kerros' : 'Kerrosten lukumäärä'}
                value={data.floor_count || 'Ei määritelty'}
              />

              <DataDisplay
                title={
                  <>
                    Asuintilojen pinta-ala <sup>m2</sup>
                  </>
                }
                value={
                  (data.living_area != undefined && (data as any).living_area) || 'Ei määritelty'
                }
              />

              <DataDisplay
                title={
                  <>
                    {' '}
                    Muu pinta-ala <sup>m2</sup>
                  </>
                }
                value={(data.other_area != undefined && data.other_area) || 'Ei määritelty'}
              />

              <DataDisplay
                title={
                  <>
                    {' '}
                    Kokonaispinta-ala <sup>m2</sup>
                  </>
                }
                value={data.other_area + data.living_area || 'Ei määritelty'}
              />

              <DataDisplay
                title='Lämmitysmuoto'
                value={primaryHeating || 'Ei määritelty'}
              />
              <DataDisplay
                title='Omistajat'
                value={owners.length}
              />
            </div>
          </div>

          <div
            className='w-full flex items-center justify-center'
            id='overview-box-image-container'>
            <DialogPrefab
              trigger={
                <img
                  src={
                    mainImageId
                      ? `/api/protected/files/${mainImageId}`
                      : '/img/Properties/default-bg.jpg'
                  }
                  loading='lazy'
                  title='Valitse pääkuva'
                  className='rounded-full aspect-square object-center md:w-[50%] xs:w-full cursor-pointer'
                />
              }
              target={<SelectImageDialog images={fileData.filter(f => f.type == 'image/jpeg')} />}
            />
          </div>
        </div>
      </BoxFieldset>

      <div className='gap-4 xs:flex-col md:flex-row flex'>
        <div className='flex md:w-[50%] xs:w-full'>
          <BoxFieldset
            legend={
              <div className='flex w-full gap-4 items-center xs:justify-between lg:justify-start'>
                <span>Tapahtumat</span>

                <div className='flex items-center'>
                  <Link
                    href={`/dashboard/properties/${id}/events`}
                    title='Näytä kaikki tapahtumat'>
                    <IconButton size='small'>
                      <Visibility />
                    </IconButton>
                  </Link>

                  <Link
                    href={`/dashboard/properties/${id}/events/add`}
                    title='Lisää uusi tapahtuma'>
                    <IconButton size='small'>
                      <Add />
                    </IconButton>
                  </Link>
                </div>
              </div>
            }>
            <div className='flex gap-2 overflow-x-scroll snap-mandatory snap-x'>
              {eventData.length
                ? eventData.map(async ed => {
                    const [image_id] = await db('data_mainImages')
                      .where({ objectId: ed.id })
                      .pluck('id');
                    return (
                      <Card
                        title={ed.title}
                        description={ed.description || 'Ei kuvausta'}
                        href={`/dashboard/properties/${id}/events/${ed.id}`}
                        imageSrc={
                          image_id ? `/api/protected/files/${image_id}` : '/img/kitchen.jpg'
                        }
                      />
                    );
                  })
                : 'Ei tapahtumia.'}
            </div>
          </BoxFieldset>
        </div>

        <div className='flex md:w-[50%] xs:w-full'>
          <BoxFieldset
            legend={
              <div className='w-full flex items-center gap-4 xs:justify-between lg:justify-start'>
                <span>Kulutustiedot</span>
                <div className='flex items-center'>
                  <Link href={`/dashboard/properties/${id}/utility`}>
                    <IconButton size='small'>
                      <Visibility />
                    </IconButton>
                  </Link>

                  <Link
                    href={`/dashboard/properties/${id}/utility/add`}
                    title='Lisää uusi kulutustieto'>
                    <IconButton size='small'>
                      <Add />
                    </IconButton>
                  </Link>
                </div>
              </div>
            }>
            <div className='flex w-full'>
              <UtilityProvider
                data={utilityData}
                year={null}
                selectedTypes={[]}>
                <div className='w-full'>
                  <UtilityLineChart />
                </div>
              </UtilityProvider>
            </div>
          </BoxFieldset>
        </div>
      </div>

      <BoxFieldset
        legend={
          <div className='w-full flex items-center gap-4 xs:justify-between lg:justify-start'>
            <span>Tiedostot ja kuvat</span>

            <div className='flex items-center'>
              <Link href={`/dashboard/files?parentId=${id}&returnUrl=/dashboard/properties/${id}`}>
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </Link>

              <Link
                href={`/dashboard/files/add?parentId=${id}`}
                title='Lisää uusi tiedosto'>
                <IconButton size='small'>
                  <Add />
                </IconButton>
              </Link>
            </div>
          </div>
        }>
        <div className='flex gap-2 wrap w-full'>
          {fileData.length
            ? fileData.map(file => {
                return (
                  <FileCard
                    file={file}
                    isMain={file.id == mainImageId}
                  />
                );
              })
            : 'Ei tiedostoja.'}
        </div>
      </BoxFieldset>
    </Main>
  );
}
