import {
  AppartmentPayloadType,
  HousePayloadType,
  PropertyPayloadType,
} from 'kotilogi-app/dataAccess/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
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
  >('none');

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
      await createPropertyAction({
        ...data,
        heating: prepareHeatingData(),
      } as PropertyPayloadType);
      toast.success('Talo luotu!');
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  });
  const onSubmit = usePreventDefault(method);

  const router = useRouter();

  useEffect(() => {
    //Update the server-side data automatically if editing an existing property.
    if (!property || !hasChanges) return;

    const timeout = setTimeout(async () => {
      const loadingToast = toast.loading('Päivitetään tietoja...');

      await updatePropertyAction(property.id, {
        ...data,
        heating: prepareHeatingData(),
      } as PropertyPayloadType)
        .catch(err => toast.error(err.message))
        .finally(() => toast.dismiss(loadingToast));
    }, 900);

    return () => clearTimeout(timeout);
  }, [data, heatingBatch]);

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
