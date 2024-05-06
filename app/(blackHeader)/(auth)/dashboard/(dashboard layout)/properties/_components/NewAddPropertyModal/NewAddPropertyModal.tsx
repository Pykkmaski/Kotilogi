'use client';

import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { Group, Input, SubLabel } from '@/components/UI/FormUtils';
import { Modal } from '@/components/UI/Modal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import style from './style.module.css';
import { RadioGroup } from '@/components/Feature/RadioGroup';
import { useInputData } from '@/hooks/useInputData';
import { useEffect } from 'react';
import { primaryHeatingSystems, secondaryHeatingSystems } from 'kotilogi-app/constants';
import { TokenInput } from '@/components/Feature/TokenInput';

const Fieldset = ({ children, legend }: React.ComponentProps<'fieldset'> & { legend: string }) => {
  return (
    <fieldset className='border border-slate-300 p-2 flex-col flex gap-4 rounded-md'>
      <legend className='px-2 text-slate-500 font-semibold'>{legend}</legend>
      {children}
    </fieldset>
  );
};

export function NewAddPropertyModalTrigger() {
  const { data, updateData } = useInputData({});

  return (
    <VisibilityProvider>
      <VisibilityProvider.Trigger>
        <AddButton />
      </VisibilityProvider.Trigger>

      <VisibilityProvider.Target>
        <Modal>
          <Modal.DefaultContentContainer>
            <Modal.HeaderWithTitle
              title='Lisää kohde'
              icon='fa-home'
            />

            <Modal.Body>
              <form
                className={style.container}
                onChange={updateData}>
                <TokenInput
                  value={'kalja'}
                  name='test'>
                  Testtoken
                </TokenInput>
                <Fieldset legend='Kohdetyyppi'>
                  <RadioGroup groupName='targetType'>
                    <input
                      type='radio'
                      value='Kiinteistö'
                    />

                    <input
                      type='radio'
                      value='Huoneisto'
                    />
                  </RadioGroup>
                </Fieldset>

                <Fieldset legend='Yleistiedot'>
                  <div className='flex flex-row gap-2 w-full'>
                    <div className='w-full'>
                      <Group>
                        <label>Osoite</label>
                        <Input
                          name='title'
                          placeholder='Kirjoita talon osoite...'></Input>
                      </Group>
                    </div>

                    <div className='w-full'>
                      <Group>
                        <label>Postinumero</label>
                        <Input
                          name='zipCode'
                          placeholder='Kirjoita talon postinumero...'></Input>
                        <SubLabel>
                          Postinumeron tulee olla voimassa oleva Suomen postinumero.
                        </SubLabel>
                      </Group>
                    </div>
                  </div>
                </Fieldset>

                <Fieldset legend='Sisätilat'>
                  <Group>
                    <label>
                      Pinta-ala <sup className='text-super'>m2</sup>
                    </label>
                    <Input
                      name='livingArea'
                      placeholder='Anna kohteen sisätilojen pinta-ala...'
                      type='number'
                      min='1'
                    />
                  </Group>

                  <Group>
                    <label>Huoneiden lukumäärä</label>
                    <Input
                      type='number'
                      name='roomCount'
                      placeholder='Anna huoneiden lukumäärä...'
                      min='1'
                      step='1'
                      defaultValue={1}
                    />
                  </Group>

                  <Group>
                    <label>Kerrosten lukumäärä</label>
                    <Input
                      name='floorCount'
                      step='1'
                      min='1'
                      defaultValue={1}
                      type='number'
                      placeholder='Anna kerrosten lukumäärä...'
                    />
                  </Group>

                  <Group>
                    <label>Vessojen lukumäärä</label>
                    <Input
                      name='wcCount'
                      placeholder='Anna vessojen lukumäärä'
                      type='number'
                      min={0}
                      defaultValue={1}
                    />
                  </Group>
                </Fieldset>

                <div className='flex flex-row w-full gap-2 [&>*]:w-full'>
                  <Fieldset legend='Ensisijainen lämmitystapa'>
                    <RadioGroup groupName='primaryHeatingSystem'>
                      {primaryHeatingSystems.map(type => (
                        <input
                          type='radio'
                          value={type}
                        />
                      ))}
                    </RadioGroup>
                  </Fieldset>

                  <Fieldset legend='Toissijainen lämmitystapa'>
                    <RadioGroup groupName='secondaryHeatingSystem'>
                      {secondaryHeatingSystems.map(type => (
                        <input
                          type='radio'
                          value={type}
                        />
                      ))}
                    </RadioGroup>
                  </Fieldset>
                </div>
              </form>
            </Modal.Body>
          </Modal.DefaultContentContainer>
        </Modal>
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );
}
