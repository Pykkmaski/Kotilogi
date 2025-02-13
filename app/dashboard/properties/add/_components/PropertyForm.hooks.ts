import {
  AppartmentPayloadType,
  HousePayloadType,
  PropertyPayloadType,
} from 'kotilogi-app/dataAccess/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createPropertyAction, updatePropertyAction } from './actions';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import { getIdByLabel } from 'kotilogi-app/utils/getIdByLabel';
import { useBatchForm } from '@/hooks/useBatchForm';

export function usePropertyForm(
  property: HousePayloadType | AppartmentPayloadType | undefined,
  refs: TODO
) {
  const { data, updateData, resetData, hasChanges } = useFormOnChangeObject(
    property ||
      ({ property_type_id: getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name') } as
        | HousePayloadType
        | AppartmentPayloadType),
    'kotidok-property-data'
  );
  const [selectedHeating, setSelectedHeating] = useState([]);
  const {
    entries: heatingBatch,
    data: currentHeating,
    updateData: updateHeatingData,
    addEntry: addHeatingEntry,
    updateEntry: updateHeatingEntry,
    removeEntry: removeHeating,
    resetData: resetCurrentHeating,
  } = useBatchForm<TODO>(property?.heating, 'kotidok-property-heating');

  const isNew = property == undefined;

  const [propertyIdentifierStatus, setPropertyIdentifierStatus] = useState<
    'none' | 'valid' | 'invalid' | 'loading'
  >(() => (!isNew ? 'valid' : 'none'));

  const isValid = propertyIdentifierStatus === 'valid';

  const prepareHeatingData = () => {
    return heatingBatch
      .map(hb => {
        return hb.value.heating_type_id !== 'undefined' ? hb.value : null;
      })
      .filter(hb => hb !== null);
  };

  const { method, status } = useStatusWithAsyncMethod(async () => {
    try {
      if (isNew) {
        await createPropertyAction({
          ...data,
          heating: selectedHeating,
        } as PropertyPayloadType);
        toast.success('Talo luotu!');
      } else {
        await updatePropertyAction(property.id, {
          ...data,
        } as PropertyPayloadType);
        toast.success('Talo päivitetty!');
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  });

  const onSubmit = usePreventDefault(method);

  const router = useRouter();

  return {
    data,
    heatingBatch,
    currentHeating,
    addHeatingEntry,
    removeHeating,
    updateHeatingData,
    updateHeatingEntry,
    resetCurrentHeating,
    setPropertyIdentifierStatus,
    selectedHeating,
    setSelectedHeating,
    propertyIdentifierStatus,
    status,
    isValid,
    isNew,
    router,
    updateData,
    resetData,
    onSubmit,
  };
}
