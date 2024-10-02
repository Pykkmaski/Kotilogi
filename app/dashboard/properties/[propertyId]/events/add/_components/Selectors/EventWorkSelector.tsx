import { FormControl, NullOption } from '@/components/UI/FormUtils';
import { useEventContext } from '../EventContext';
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
  const { event: data } = useEventContext();
  const { data: workTypes, isLoading } = useQuery({
    queryFn: async () => await fetchWorkTypes(data.targetId),
    queryKey: [`workTypes-${data.mainTypeId}-${data.targetId}`],
  });

  console.log(data.workTypeId);
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
            const checked = data.workTypeId == t.id;
            if (t.label == 'Muu') {
              console.log(t.id, data.workTypeId, checked);
            }
            return (
              <ChipButton
                key={`workType-${i}`}
                value={t.id}
                name='workTypeId'
                required
                checked={data.workTypeId == t.id}
                label={t.label}
              />
            );
          })}
        </RadioGroup>
      }
    />
  );
};