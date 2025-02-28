'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useBatchForm } from '@/hooks/useBatchForm';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';
import { KDError, UserError } from 'kotilogi-app/utils/error';
import { createPropertyAction } from '../actions/createPropertyAction';
import { updatePropertyAction } from '../actions/updatePropertyAction';
import { PropertyPayloadType } from '../types/PropertyPayloadType';

export function usePropertyForm(property: PropertyPayloadType, refs: TODO) {
  const { data, updateData, updateByKey, resetData, hasChanges } = useFormOnChangeObject(
    property ||
      ({
        property_type_id: getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name'),
        building: null,
        roof: null,
        interior: null,
        yard: null,
      } as PropertyPayloadType),
    'kotidok-property-data'
  );

  const savedHeating = sessionStorage.getItem('kotidok-property-energy-class');
  const [selectedHeating, setSelectedHeating] = useState(
    savedHeating ? JSON.parse(savedHeating) : []
  );
  useSaveToSessionStorage('kotidok-property-energy-class', selectedHeating);

  const isNew = property == undefined;

  const [propertyIdentifierStatus, setPropertyIdentifierStatus] = useState<
    'none' | 'valid' | 'invalid' | 'loading'
  >(() => (!isNew ? 'valid' : 'none'));
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const isValid = propertyIdentifierStatus === 'valid';
  const onSubmit = async (e: any) => {
    e.preventDefault();
    let currentStatus: typeof status = 'loading';
    setStatus(currentStatus);

    try {
      if (isNew) {
        const result = await createPropertyAction({
          ...data,
          heating: selectedHeating,
        } as TODO);

        if (result.code === KDError.LIMIT_HIT) {
          toast.error('Et voi enää lisätä taloja, sillä tilin talojen määrän raja on täynnä.');
          currentStatus = 'error';
        } else {
          toast.success('Talo luotu!');
          router.push(`/dashboard/properties/${result.data}`);
          currentStatus = 'done';
        }
      } else {
        const result = await updatePropertyAction(property.id, {
          ...data,
        } as PropertyPayloadType);

        if (result.code === UserError.NOT_OWNER) {
          toast.error('Et voi päivittää taloa, sillä et ole sen omistaja!');
          currentStatus = 'error';
        } else {
          toast.success('Talo päivitetty!');
          router.replace(`/dashboard/properties/${property.id}/`);
          currentStatus = 'done';
        }
      }
    } catch (err) {
      const msg = err.message as string;
      if (!msg.includes('NEXT_REDIRECT')) {
        toast.error('Tapahtui odottamaton virhe!');
        currentStatus = 'error';
      }
    } finally {
      setStatus(currentStatus);
    }
  };

  const router = useRouter();

  const updateField = (field: 'interior' | 'roof' | 'building' | 'yard', e: any) => {
    const { name, type } = e.target;
    const value =
      type === 'number'
        ? e.target.value !== ''
          ? e.target.valueAsNumber
          : undefined
        : type === 'checkbox'
        ? e.target.checked
        : e.target.value;

    const newValue = data[field] ? { ...data[field], [name]: value } : { [name]: value };
    updateByKey(field, newValue);
  };

  return {
    data,
    setPropertyIdentifierStatus,
    selectedHeating,
    setSelectedHeating,
    propertyIdentifierStatus,
    status,
    isValid,
    isNew,
    router,
    updateData,
    updateByKey: updateField,
    resetData,
    onSubmit,
  };
}
