import {
  AppartmentPayloadType,
  BuildingDataType,
  HeatingPayloadType,
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
import useLocalStorage from '@/hooks/useLocalStorage';
import { useSaveToSessionStorage } from '@/hooks/useSaveToSessionStorage';

export function usePropertyForm(
  property: HousePayloadType | AppartmentPayloadType | undefined,
  refs: TODO
) {
  const address = property && property.streetAddress.split(' ');

  let streetName;
  let houseNumber;

  if (address) {
    houseNumber = address.at(-1);
    //Remove the house number.
    address.splice(-1, 1);
    streetName = address.join(' ');
  }

  const { data, updateData, resetData, hasChanges } = useFormOnChangeObject(
    property ||
      ({ propertyTypeId: getIdByLabel(refs.propertyTypes, 'Kiinteistö', 'name') } as
        | HousePayloadType
        | AppartmentPayloadType),
    'kotidok-property-data'
  );

  const {
    entries: heatingBatch,
    data: currentHeating,
    updateData: updateHeatingData,
    addEntry: addHeating,
    updateEntry: updateHeatingEntry,
    removeEntry: removeHeating,
  } = useBatchForm<TODO>(property?.heating);

  const isNew = property == undefined;

  const [isValid, setIsValid] = useState(false);
  const { method, status } = useStatusWithAsyncMethod(async () => {
    try {
      await createPropertyAction({
        ...data,
        heating: heatingBatch.map(hb => hb.value),
      } as PropertyPayloadType);
      toast.success('Talo luotu!');
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  });
  const onSubmit = usePreventDefault(method);

  const router = useRouter();

  const updatePropertyInfo = useCallback(
    (info: TODO, valid: boolean = false) => {
      if (!info) {
        toast.error('Kiinteistötunnuksella ei löytynyt kohdetta!');
      } else {
        resetData({
          ...data,
          ...info,
        });
      }

      setIsValid(valid);
    },
    [setIsValid, data]
  );

  useEffect(() => {
    //Update the server-side data automatically if editing an existing property.
    if (!property || !hasChanges) return;

    const timeout = setTimeout(async () => {
      const loadingToast = toast.loading('Päivitetään tietoja...');

      await updatePropertyAction(property.id, data as PropertyPayloadType)
        .catch(err => toast.error(err.message))
        .finally(() => toast.dismiss(loadingToast));
    }, 900);

    return () => clearTimeout(timeout);
  }, [data]);

  useSaveToSessionStorage('kotidok-property-data', property);

  return {
    data,
    heatingBatch,
    currentHeating,
    addHeating,
    removeHeating,
    updateHeatingData,
    updateHeatingEntry,
    status,
    isValid,
    isNew,
    router,
    updateData,
    resetData,
    updatePropertyInfo,
    onSubmit,
  };
}
