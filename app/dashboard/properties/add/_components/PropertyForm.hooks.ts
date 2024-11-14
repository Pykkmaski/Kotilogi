import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/dataAccess/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createPropertyAction, updatePropertyAction } from './actions';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { usePreventDefault } from '@/hooks/usePreventDefault';

export function usePropertyForm(
  property: HouseDataType | AppartmentDataType | undefined,
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
    (property !== undefined && {
      ...property,
    }) || {
      propertyTypeId: refs.propertyTypes.find(type => type.name === 'Kiinteistö').id.toString(),
    }
  );

  const [isValid, setIsValid] = useState(false);
  const { method, status } = useStatusWithAsyncMethod(async () => {
    await createPropertyAction(data as PropertyDataType);
    toast.success('Talo luotu!');
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
      await updatePropertyAction(property.id, data as PropertyDataType)
        .catch(err => toast.error(err.message))
        .finally(() => toast.dismiss(loadingToast));
    }, 900);

    return () => clearTimeout(timeout);
  }, [data]);

  return {
    data,
    status,
    isValid,
    router,
    updateData,
    resetData,
    updatePropertyInfo,
    onSubmit,
  };
}
