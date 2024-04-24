'use client';

import { Input, Select } from '@/components/Input/Input';
import { SubmitModalPrefab } from '@/components/SubmitModalPrefab';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import { addProperty } from 'kotilogi-app/actions/experimental/properties';
import { buildingTypes } from 'kotilogi-app/constants';
import toast from 'react-hot-toast';

export function AddPropertyModalPrefab() {
  return (
    <SubmitModalPrefab
      trigger={<AddButton />}
      icon='fa-house'
      modalTitle='Lisää Talo'
      submitText='Lähetä'
      submitMethod={async (data: Kotidok.PropertyType, files?) => {
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
  );
}
