import { Main } from '@/components/New/Main';
import { FileCard } from '@/components/New/FileCard';
import { BoxFieldset } from '@/components/UI/BoxFieldset';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { Add, Visibility } from '@mui/icons-material';
import { events } from 'kotilogi-app/dataAccess/events';
import { DataDisplay } from '@/components/UI/DataDisplay';
import { SelectImageDialog } from '@/components/Feature/SelectImageDialog/SelectImageDialog';
import { DialogPrefab } from '@/components/UI/VPDialog';
import db from 'kotilogi-app/dbconfig';

const DataPointGrid = ({ children }) => (
  <div className='w-full grid lg:grid-cols-2 xs:grid-cols-1 gap-4'>{children}</div>
);
const DataPointContainer = ({ children, title }) => (
  <div className='flex flex-col gap-2 w-full bg-gray-50 p-2'>
    <h1 className='font-semibold mb-4'>{title}</h1>
    {children}
  </div>
);

export default async function EventPage({ params }) {
  const { eventId, propertyId } = await params;
  const [event] = (await events.get({
    id: eventId,
  })) as [TODO];

  const files = await db('data_files')
    .join(db.raw('object on object.id = data_files.id'))
    .where({ 'object.parentId': eventId });

  const [mainImageId] = await db('data_mainImages').where({ objectId: eventId }).pluck('imageId');
  const [{ result: eventTypes }] = (await db('types.event_type').select(
    db.raw('json_object_agg(label, id) as result')
  )) as TODO;
  const [{ result: eventTargets }] = (await db('types.event_target_type').select(
    db.raw('json_object_agg(label, id) as result')
  )) as TODO;

  return (
    <Main>
      <BoxFieldset legend='Tapahtuman tiedot'>
        <div className='flex lg:flex-row xs:flex-col-reverse xs:gap-4 lg:gap-0 justify-between w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <h1 className='md:text-xl xs:text-lg font-semibold'>{event.title || 'Ei Otsikkoa'}</h1>
            <p className='mb-8'>{event.description || 'Ei kuvausta.'}</p>
            <h1 className='font-semibold text-slate-500'>Tiedot</h1>
            {event.event_type == eventTypes['Peruskorjaus'] ? (
              event.target_type == eventTargets['Ulkoverhous'] ? (
                <>
                  <DataDisplay
                    title='Materiaali'
                    value={event.exterior_cladding_material_type_label}
                  />
                  <DataDisplay
                    title='Jyrsijäverkko'
                    value={event.has_rodent_net ? 'Kyllä' : 'Ei'}
                  />

                  <DataDisplay
                    title='Tuulensuojaeriste'
                    value={event.has_wind_protection ? 'Kyllä' : 'Ei'}
                  />
                  <DataDisplay
                    title={<>Tuulensuojalevyn paksuus (mm)</>}
                    value={event.wind_protection_plate_thickness || 'Ei tuulensuojalevyä'}
                  />
                </>
              ) : event.target_type == eventTargets['Lämmitysmuoto'] ? (
                <>
                  <DataDisplay
                    title='Vanha järjestelmä'
                    value={event.old_system_label}
                  />

                  <DataDisplay
                    title='Uusi järjestelmä'
                    value={event.new_system_label}
                  />
                </>
              ) : event.target_type == eventTargets['Käyttövesiputket'] ? (
                <DataDisplay
                  title='Asennustapa'
                  value={event.installation_method_label}
                />
              ) : event.target_type == eventTargets['Viemäriputket'] ? (
                <DataDisplay
                  title='Korjaustapa'
                  value={event.restoration_method_label}
                />
              ) : event.target_type == eventTargets['Sähköt'] ? (
                <DataDisplay
                  title='Kohde'
                  value={event.restoration_target_label}
                />
              ) : null
            ) : event.event_type == eventTypes['Huoltotyö'] &&
              event.target_type !== eventTargets['Muu'] ? (
              <DataDisplay
                title='Tehty huoltotyö'
                value={event.service_work_type_label}
              />
            ) : null}
            <DataDisplay
              title='Työkulut'
              value={event.labour_expenses + '€'}
            />
            <DataDisplay
              title='Materiaalikulut'
              value={event.material_expenses + '€'}
            />

            <DataDisplay
              title='Kulut yhteensä'
              value={parseFloat(event.labour_expenses) + parseFloat(event.material_expenses) + '€'}
            />

            <DataDisplay
              title='Päiväys'
              value={event.date?.toLocaleDateString('fi')}
            />
          </div>
          <div
            className='w-full flex items-center justify-center'
            id='overview-box-image-container'>
            <DialogPrefab
              trigger={
                <img
                  src={mainImageId ? `/api/protected/files/${mainImageId}` : '/img/kitchen.jpg'}
                  loading='lazy'
                  title='Valitse pääkuva'
                  className='rounded-full aspect-square object-cover md:w-[50%] xs:w-full cursor-pointer'
                />
              }
              target={<SelectImageDialog images={files.filter(f => f.type == 'image/jpeg')} />}
            />
          </div>
        </div>
      </BoxFieldset>

      {event.event_type == eventTypes['Peruskorjaus'] &&
      event.target_type == eventTargets['Ikkunat'] ? (
        <BoxFieldset
          legend='Asennetut ikkunat'
          closeable>
          <DataPointGrid>
            {event.windows.map((w, i) => {
              return (
                <DataPointContainer
                  key={`window-${i}`}
                  title={<>Ikkuna {i + 1}</>}>
                  <DataDisplay
                    title='U-Arvo'
                    value={w.u_value}
                  />
                  <DataDisplay
                    title='Vähim. äänieristyskyky'
                    value={w.min_db_rating}
                  />
                  <DataDisplay
                    title='Vähim. äänieristyskyky'
                    value={w.max_db_rating}
                  />
                  <DataDisplay
                    title='Määrä'
                    value={w.quantity}
                  />
                </DataPointContainer>
              );
            })}
          </DataPointGrid>
        </BoxFieldset>
      ) : event.target_type == eventTargets['Lukitus'] ? (
        <BoxFieldset
          legend='Asennetut lukot'
          closeable>
          <DataPointGrid>
            {event.locks.map((l, i) => {
              return (
                <DataPointContainer
                  key={`lock-${i}`}
                  title={<>Lukko {i + 1}</>}>
                  <h1 className='font-semibold mb-4'></h1>
                  <DataDisplay
                    title='Lukon tyyppi'
                    value={l.lock_type_label}
                  />
                  <DataDisplay
                    title='Merkki'
                    value={l.brand}
                  />
                  <DataDisplay
                    title='Malli'
                    value={l.model}
                  />
                </DataPointContainer>
              );
            })}
          </DataPointGrid>
        </BoxFieldset>
      ) : event.target_type == eventTargets['Eristys'] ? (
        <BoxFieldset
          legend='Eristykset'
          closeable>
          <DataPointGrid>
            {event.insulation.map((d, i) => {
              return (
                <DataPointContainer
                  title={<>Eristys {i + 1}</>}
                  key={`insulation-${i}`}>
                  <DataDisplay
                    title='Kohde'
                    value={d.insulation_target_label}
                  />
                  <DataDisplay
                    title='Materiaali'
                    value={d.insulation_material_label}
                  />
                </DataPointContainer>
              );
            })}
          </DataPointGrid>
        </BoxFieldset>
      ) : null}

      <BoxFieldset
        legend={
          <div className='w-full flex items-center gap-4 xs:justify-between lg:justify-start'>
            <span>Tiedostot ja kuvat</span>

            <div className='flex items-center'>
              <Link
                href={`/dashboard/files?parentId=${eventId}&returnUrl=/dashboard/properties/${propertyId}/events/${eventId}`}>
                <IconButton size='small'>
                  <Visibility />
                </IconButton>
              </Link>

              <Link
                href={`/dashboard/files/add?parentId=${eventId}`}
                title='Lisää uusi tiedosto'>
                <IconButton size='small'>
                  <Add />
                </IconButton>
              </Link>
            </div>
          </div>
        }>
        <div className='flex gap-2 wrap w-full'>
          {files.length
            ? files.map(file => (
                <FileCard
                  file={file}
                  isMain={file.id == mainImageId}
                />
              ))
            : 'Ei tiedostoja.'}
        </div>
      </BoxFieldset>
    </Main>
  );
}
