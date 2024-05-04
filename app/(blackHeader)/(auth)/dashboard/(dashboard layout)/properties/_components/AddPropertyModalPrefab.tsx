'use client';

import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { Input, Select } from '@/components/Feature/Input';
import { SubmitModalPrefab } from '@/components/Feature/SubmitModalPrefab';
import { addProperty } from 'kotilogi-app/actions/experimental/properties';
import { buildingTypes } from 'kotilogi-app/constants';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function AddPropertyModalPrefab() {
  const [selectedTargetType, setSelectedTargetType] = useState('Kiinteistö');

  return (
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
      <Select
        name='targetType'
        label='Kohdetyyppi'
        required
        onChange={e => setSelectedTargetType(e.target.value)}
        defaultValue={'Kiinteistö'}>
        <Select.Option
          value='Kiinteistö'
          selected>
          Kiinteistö
        </Select.Option>

        <Select.Option value='Huoneisto'>Huoneisto</Select.Option>
      </Select>

      {selectedTargetType === 'Kiinteistö' ? (
        <Input
          name='propertyNumber'
          label='Kiinteistötunnus'
          description='Talon ainutlaatuinen tunnus.'
          required
          placeholder='Kirjoita kiinteistötunnus...'
        />
      ) : null}

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

      <span className='text-slate-500 w-full text-right'>
        Yksittäisen talon vuosihinta on <span className='text-green-700'>9,90€</span>
      </span>
    </SubmitModalPrefab>
  );
}
