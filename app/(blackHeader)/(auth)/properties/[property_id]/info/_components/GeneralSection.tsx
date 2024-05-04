'use client';

import { Input, Select, Textarea } from '@/components/Feature/Input';
import { buildingTypes, energyClasses } from 'kotilogi-app/constants';
import { ContentCard } from '@/components/UI/RoundedBox';
import {
  SingleInputForm,
  SingleSelectForm,
} from '@/components/Feature/SingleInputForm/SingleInputForm';
import { Group } from '@/components/UI/Group';

/*<SingleInputForm
              submitMethod={updateProperty}
              inputComponent={Input}
              editingDisabled={propertyData.propertyNumber ? true : false}
              initialInputProps={{
                label: 'Kiinteistötunnus',
                description: 'Talon kiinteistötunnus',
                autoComplete: 'off',
                name: 'propertyNumber',
                defaultValue: propertyData.propertyNumber,
              }}
            /> */

export default function GeneralSection({ propertyData, updateProperty }) {
  return (
    <div className='w-full'>
      <ContentCard title='Yleistiedot'>
        <div className='mb-8 w-full'>
          <Group
            direction='col'
            gap={4}>
            {propertyData.targetType === 'Kiinteistö' ? (
              <SingleInputForm
                submitMethod={updateProperty}
                inputComponent={Input}
                editingDisabled={propertyData.propertyNumber ? true : false}
                initialInputProps={{
                  label: 'Kiinteistötunnus',
                  description: 'Talon kiinteistötunnus',
                  autoComplete: 'off',
                  name: 'propertyNumber',
                  defaultValue: propertyData.propertyNumber,
                }}
              />
            ) : null}

            <SingleInputForm
              submitMethod={updateProperty}
              editingDisabled={true}
              inputComponent={Input}
              initialInputProps={{
                label: 'Osoite',
                description: 'Talon katuosoite.',
                autoComplete: 'off',
                name: 'title',
                defaultValue: propertyData.title,
              }}
            />

            {propertyData.targetType === 'Huoneisto' ? (
              <SingleInputForm
                submitMethod={updateProperty}
                inputComponent={Input}
                initialInputProps={{
                  label: 'Huoneiston numero',
                  autoComplete: 'off',
                  name: 'appartmentNumber',
                  defaultValue: propertyData.appartmentNumber,
                }}
              />
            ) : null}

            <SingleInputForm
              submitMethod={updateProperty}
              editingDisabled={true}
              inputComponent={Input}
              initialInputProps={{
                name: 'zipCode',
                label: 'Postinumero',
                description: 'Talon viisinumeroinen postinumero.',
                autoComplete: 'off',
                defaultValue: propertyData.zipCode,
              }}
            />

            <SingleInputForm
              submitMethod={updateProperty}
              editingDisabled={true}
              inputComponent={Input}
              initialInputProps={{
                name: 'buildYear',
                label: 'Rakennusvuosi',
                description: 'Talon valmistumisvuosi.',
                autoComplete: 'off',
                required: false,
                defaultValue: propertyData.buildYear,
              }}
            />

            <SingleSelectForm
              submitMethod={updateProperty}
              editingDisabled={true}
              inputComponent={Select}
              childComponent={Select.Option}
              initialInputProps={{
                label: 'Talotyyppi',
                description: 'Talon tyyppi.',
                name: 'buildingType',
                defaultValue: propertyData.buildingType || buildingTypes.at(-1),
              }}
              childProps={[
                ...buildingTypes.map(type => {
                  return {
                    value: type,
                    children: type,
                  };
                }),
              ]}
            />
          </Group>
        </div>

        <SingleSelectForm
          submitMethod={updateProperty}
          inputComponent={Select}
          childComponent={Select.Option}
          initialInputProps={{
            label: 'Energialuokka',
            description: 'Talon energialuokitus.',
            name: 'energyClass',
            defaultValue: propertyData.energyClass || energyClasses.at(-1),
          }}
          childProps={energyClasses.map(type => {
            return {
              value: type,
              children: type,
            };
          })}
        />

        <SingleSelectForm
          submitMethod={updateProperty}
          inputComponent={Select}
          childComponent={Select.Option}
          initialInputProps={{
            label: 'Autotalli',
            description: 'Onko talolla autotallia?',
            name: 'hasGarage',
            defaultValue: propertyData.hasGarage || 'Ei',
          }}
          childProps={[
            {
              value: 'Kyllä',
              children: 'Kyllä',
            },
            {
              value: 'Ei',
              children: 'Ei',
            },
          ]}
        />

        <SingleInputForm
          submitMethod={updateProperty}
          inputComponent={Textarea}
          initialInputProps={{
            name: 'description',
            label: 'Kuvaus',
            description: 'Talon lyhyt kuvaus.',
            defaultValue: propertyData.description,
            spellCheck: false,
            autoComplete: 'false',
            maxLength: 256,
          }}
        />
      </ContentCard>
    </div>
  );
}
