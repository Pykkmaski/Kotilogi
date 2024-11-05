import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/dataAccess/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createPropertyAction, updatePropertyAction } from './actions';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';

export function usePropertyForm(
  property: HouseDataType | AppartmentDataType | undefined,
  refs: TODO
) {
  const [hasChanges, setHasChanges] = useState(false);
  const address = property && property.streetAddress.split(' ');

  let streetName;
  let houseNumber;
  if (address) {
    houseNumber = address.at(-1);
    //Remove the house number.
    address.splice(-1, 1);
    streetName = address.join(' ');
  }

  const { data, updateData, resetData } = useFormOnChangeObject(
    (property !== undefined && {
      ...property,
      streetAddress: streetName,
      houseNumber,
    }) || {
      propertyTypeId: refs.propertyTypes.find(type => type.name === 'Kiinteistö').id.toString(),
    }
  );
  const [isValid, setIsValid] = useState(false);
  const [status, setStatus] = useState(FormStatus.IDLE);

  const router = useRouter();

  const updatePropertyInfo = (info: TODO, valid: boolean = false) => {
    if (!info) {
      toast.error('Kiinteistötunnuksella ei löytynyt kohdetta!');
    } else {
      resetData({
        ...data,
        ...info,
      });
    }

    setIsValid(valid);
  };

  const updateChanges = (state: boolean) => setHasChanges(state);

  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      setStatus(FormStatus.LOADING);
      try {
        await createPropertyAction(data as PropertyDataType);
        toast.success('Talo luotu!');
        setStatus(FormStatus.DONE);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setStatus(prev => (prev === FormStatus.LOADING ? FormStatus.IDLE : prev));
      }
    },
    [createPropertyAction, toast]
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
    updateChanges,
    onSubmit,
  };
}
