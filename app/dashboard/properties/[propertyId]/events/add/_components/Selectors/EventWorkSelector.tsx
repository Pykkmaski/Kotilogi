import { FormControl, NullOption } from '@/components/UI/FormUtils';
import { useEventFormContext } from '../EventFormContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '@/components/UI/Spinner';
import { ChipButton, RadioGroup } from '@/components/Feature/RadioGroup';
import { useEffect } from 'react';

const fetchWorkTypes = async (targetId: number) =>
  await axios.get(`/api/protected/properties/events/workTypes?targetId=${targetId}`).then(res => {
    if (res.status !== 200) {
      return [];
    }

    return res.data;
  });

export const EventWorkSelector = () => {
  const { mainData, typeData } = useEventFormContext();
  const { data: workTypes, isLoading } = useQuery({
    queryFn: async () => await fetchWorkTypes(typeData.targetId),
    queryKey: [`workTypes-${typeData.mainTypeId}-${typeData.targetId}`],
  });

  return isLoading ? (
    <Spinner
      size='1rem'
      message='Ladataan työtyyppejä...'
    />
  ) : (
    <FormControl
      boldLabelText
      label='Tehty työ'
      required
      control={
        <RadioGroup name='workTypeId'>
          {[...workTypes, { id: -1, label: 'Muu' }].map((t, i) => {
            const checked = typeData.workTypeId == t.id;
            if (t.label == 'Muu') {
              console.log(t.id, typeData.workTypeId, checked);
            }
            return (
              <ChipButton
                key={`workType-${i}`}
                value={t.id}
                name='workTypeId'
                required
                checked={typeData.workTypeId == t.id}
                label={t.label}
              />
            );
          })}
        </RadioGroup>
      }
    />
  );
};
