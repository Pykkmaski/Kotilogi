'use client';

import { addProperty } from 'kotilogi-app/actions/experimental/properties';

import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { Input, Select } from '@/components/Feature/Input';
import toast from 'react-hot-toast';
import { buildingTypes } from 'kotilogi-app/constants';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { CancelSelectionButton, ListHeaderControlButtons } from '@/components/Prefabs/List.prefabs';
import { DeletePropertiesModalTrigger } from './DeletePropertiesModal';
import { Gallery } from '@/components/Feature/GalleryBase/Gallery';
import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { GalleryListItem } from '@/components/Feature/GalleryBase/GalleryListItem';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';

export function PropertiesGallery({ properties }) {
  return (
    <Gallery<Kotidok.PropertyType> data={properties}>
      <Gallery.Header title='Talot'>
        <div className='flex gap-4 items-center'>
          <SelectablesProvider.HideIfNoneSelected>
            <div className='animate-slideup-fast'>
              <ListHeaderControlButtons>
                <SelectablesProvider.ResetSelectedTrigger>
                  <CancelSelectionButton />
                </SelectablesProvider.ResetSelectedTrigger>
                <DeletePropertiesModalTrigger />
              </ListHeaderControlButtons>
            </div>
          </SelectablesProvider.HideIfNoneSelected>
          <SubmitModalPrefab
            icon='fa-home'
            trigger={<AddButton />}
            modalTitle='Lisää Talo'
            submitText='Lähetä'
            submitMethod={async (data: Kotidok.PropertyType) => {
              await addProperty(data)
                .then(() => toast.success('Talon lsäys onnistui!'))
                .catch(err => toast.error(err.message));
            }}>
            <Input
              name='propertyNumber'
              label='Kiinteistötunnus'
              description='Talon ainutlaatuinen tunnus.'
              required
              placeholder='Kirjoita kiinteistötunnus...'
            />

            <Input
              name='title'
              label='Osoite'
              description='Talon osoite.'
              placeholder='Kirjoita talon osoite...'
              required
            />

            <Input
              name='zipCode'
              label='Postinumero'
              description='Talon viisinumeroinen postinumero.'
              placeholder='Kirjoita postinumero...'
              maxLength={5}
              minLength={5}
              required={true}
              autoComplete='off'
            />

            <Input
              name='buildYear'
              label='Rakennusvuosi'
              description='Vuosi jona talo valmistui.'
              placeholder='Kirjoita talon rakennusvuosi...'
              required={true}
              autoComplete='off'
            />

            <Select
              name='buildingType'
              label='Talotyyppi'
              description='Talon tyyppi.'
              required
              defaultValue={'Muu'}>
              {buildingTypes.map(type => (
                <Select.Option
                  key={type}
                  selected={type === 'Muu'}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </SubmitModalPrefab>
        </div>
      </Gallery.Header>

      <Gallery.Body
        displayStyle='vertical'
        itemComponent={props => {
          const isActive = props.item.status === 'ok';

          return (
            <>
              <GalleryListItem
                {...props}
                title={props.item.title}
                description={props.item.description}
                faIcon='fa fa-home'
                footerText={props.item.buildingType}
                href={isActive ? `/properties/${props.item.id}/events` : ''}
                secondaryHeaderContent={
                  isActive ? (
                    <i
                      className='fa fa-check text-green-700'
                      title='Talo on käytössä.'
                    />
                  ) : (
                    <i
                      className='fa fa-ban text-red-700'
                      title='Talo on poistettu käytöstä.'
                    />
                  )
                }
                controlsContent={
                  isActive ? (
                    <SelectablesProvider.SelectTrigger item={props.item}>
                      <input
                        type='checkbox'
                        className='w-[20px] aspect-square'
                      />
                    </SelectablesProvider.SelectTrigger>
                  ) : null
                }
              />
            </>
          );
        }}
        errorElement={
          <GalleryError
            title='Ei Taloja'
            message='Et ole vielä lisännyt taloja.'
            icon='/icons/house.png'
          />
        }
      />
    </Gallery>
  );
}

export function Content({
  propertyData,
  user,
}: {
  propertyData: Kotidok.PropertyType[];
  user: { email: string };
}) {
  return (
    <main className='mb-4 flex-1 h-full'>
      <PropertiesGallery properties={propertyData} />
    </main>
  );
}
