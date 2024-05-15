'use client';

import { updateProperty } from '@/actions/experimental/properties';
import { RadioGroup } from '@/components/Feature/RadioGroup';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Group, Input, Label } from '@/components/UI/FormUtils';
import { SideBySide } from '@/components/UI/SideBySide';
import { useInputData } from '@/hooks/useInputData';
import {
  buildingMaterials,
  buildingTypes,
  colors,
  energyClasses,
  roofMaterials,
  roofTypes,
  yardOwnershipTypes,
} from 'kotilogi-app/constants';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

type PropertyFormProps = {
  property: Kotidok.PropertyType;
};

export function PropertyForm({ property }: PropertyFormProps) {
  const { data, updateData, resetData } = useInputData(property);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current === false) {
      const timeout = setTimeout(async () => {
        updateProperty(property.id, data).catch(err => toast.error(err.message));
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      firstRender.current = false;
    }
  }, [data]);

  return (
    <form
      onChange={updateData}
      className='flex flex-col gap-4'>
      <Fieldset legend='Yleistiedot'>
        <div className='w-full gap-2 flex items-center'>
          <FormControl
            className='w-full'
            required
            label='Osoite'
            control={
              <Input
                name='title'
                defaultValue={property.title}
              />
            }
          />

          <FormControl
            required
            label='Postinumero'
            control={
              <Input
                name='zipCode'
                defaultValue={property.zipCode}
              />
            }
          />
        </div>

        {property.targetType === 'Kiinteistö' ? (
          <FormControl
            className='w-full'
            label='Kiinteistötunnus'
            control={
              <Input
                name='propertyNumber'
                defaultValue={property.propertyNumber}
              />
            }
          />
        ) : property.targetType === 'Huoneisto' ? (
          <FormControl
            label='Huoneiston numero'
            control={
              <Input
                name='appartmentNumber'
                defaultValue={property.appartmentNumber}
              />
            }
          />
        ) : null}

        <FormControl
          label='Rakennusvuosi'
          control={
            <Input
              name='buildYear'
              defaultValue={property.buildYear}
            />
          }
        />

        <SideBySide>
          <Group>
            <Label boldText>Talotyyppi</Label>
            <RadioGroup groupName='buildingType'>
              {buildingTypes.map(type => (
                <input
                  type='radio'
                  value={type}
                  defaultChecked={property.buildingType === type}
                />
              ))}
            </RadioGroup>
          </Group>

          <Group>
            <Label boldText>Energialuokka</Label>
            <RadioGroup groupName='energyClass'>
              {energyClasses.map(c => (
                <input
                  type='radio'
                  value={c}
                  defaultChecked={property.energyClass === c}
                />
              ))}
            </RadioGroup>
          </Group>
        </SideBySide>
      </Fieldset>

      <Fieldset legend='Ulkopuoli'>
        <SideBySide>
          <Group>
            <Label boldText>Väri</Label>
            <RadioGroup groupName='color'>
              {colors.map(color => (
                <input
                  type='radio'
                  value={color}
                  defaultChecked={property.color === color}
                />
              ))}
            </RadioGroup>
          </Group>

          <Group>
            <Label boldText>Rakennusmateriaali</Label>
            <RadioGroup groupName='buildingMaterial'>
              {buildingMaterials.map(mat => (
                <input
                  type='radio'
                  value={mat}
                  defaultChecked={property.buildingMaterial === mat}
                />
              ))}
            </RadioGroup>
          </Group>
        </SideBySide>

        <SideBySide>
          <Group>
            <Label boldText>Katon tyyppi</Label>
            <RadioGroup groupName='roofType'>
              {roofTypes.map(type => (
                <input
                  type='radio'
                  value={type}
                  defaultChecked={property.roofType === type}
                />
              ))}
            </RadioGroup>
          </Group>

          <Group>
            <Label boldText>Katon materiaali</Label>
            <RadioGroup groupName='roofMaterial'>
              {roofMaterials.map(type => (
                <input
                  type='radio'
                  value={type}
                  defaultChecked={property.roofMaterial === type}
                />
              ))}
            </RadioGroup>
          </Group>
        </SideBySide>
      </Fieldset>

      <Fieldset legend='Sisätilat'>
        <FormControl
          label={
            <>
              Pinta-ala <sup className='text-super'>m2</sup>
            </>
          }
          control={
            <Input
              name='livingArea'
              type='number'
              defaultValue={property.livingArea}
            />
          }
        />

        <FormControl
          label={
            <>
              Muut tilat <sup className='text-super'>m2</sup>
            </>
          }
          control={
            <Input
              name='otherArea'
              type='number'
              defaultValue={property.otherArea}
            />
          }
        />

        <FormControl
          label='Huoneiden lukumäärä'
          control={
            <Input
              name='roomCount'
              type='number'
              defaultValue={property.roomCount}
            />
          }
        />

        <FormControl
          label={property.buildingType === 'Kerrostalo' ? 'Kerros' : 'Kerrosten lukumäärä'}
          control={
            <Input
              name='floorCount'
              type='number'
              defaultValue={property.floorCount}
            />
          }
        />

        <FormControl
          label='Vessojen lukumäärä'
          control={
            <Input
              name='wcCount'
              type='number'
              defaultValue={property.wcCount}
            />
          }
        />
      </Fieldset>

      <Fieldset legend='Tontti'>
        <Group>
          <Label boldText>Tontin omistus</Label>
          <RadioGroup groupName='yardOwnership'>
            {yardOwnershipTypes.map(type => (
              <input
                type='radio'
                value={type}
                defaultChecked={type === property.yardOwnership}
              />
            ))}
          </RadioGroup>
        </Group>

        {property.yardOwnership !== 'Ei Mitään' ? (
          <FormControl
            label={
              <>
                Pinta-ala <sup className='text-super'>m2</sup>
              </>
            }
            control={
              <Input
                name='yardArea'
                type='number'
                min='1'
                defaultValue={property.yardArea}
              />
            }
          />
        ) : null}
      </Fieldset>

      <Fieldset legend='Muut tiedot'>
        <div className='flex items-center gap-4'>
          <input
            name='hasGarage'
            type='checkbox'
            defaultChecked={property.hasGarage}
          />
          <Label>Autotalli</Label>
        </div>
      </Fieldset>
    </form>
  );
}
