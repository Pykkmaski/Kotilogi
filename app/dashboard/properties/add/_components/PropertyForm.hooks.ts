import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { AppartmentDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/dataAccess/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { updatePropertyAction } from './actions';

export function usePropertyForm(
  property: HouseDataType | AppartmentDataType | undefined,
  propertyTypes: TODO[]
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

  const { data, updateData, resetData } = useInputData(
    (property !== undefined && {
      ...property,
      streetAddress: streetName,
      houseNumber,
    }) || {
      propertyTypeId: propertyTypes.find(type => type.name === 'Kiinteistö').id.toString(),
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
  };
}
