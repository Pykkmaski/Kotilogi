'use client';

import { ACreateEventStep, AUpdateEventStep } from '@/actions/eventSteps';
import { ObjectSubmissionForm } from '@/components/New/Forms/ObjectSubmissionForm';
import { FormBase } from '@/components/New/Forms/FormBase';
import { Fieldset } from '@/components/UI/Fieldset';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Button } from '@mui/material';
import { EventDataType, EventStepDataType } from 'kotilogi-app/models/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';

type StepFormProps = {
  eventId: string;
  step?: EventStepDataType & Required<Pick<EventStepDataType, 'id'>>;
};

export function StepForm({ eventId, step }: StepFormProps) {
  const time = step && step.time && timestampToISOString(step.time);

  return (
    <ObjectSubmissionForm
      parentId={eventId}
      item={step}
      updateMethod={async data => {
        await AUpdateEventStep(data);
      }}
      createMethod={async data => {
        await ACreateEventStep(data);
      }}>
      <Fieldset legend='Tiedot'>
        <FormControl
          required
          label='Otsikko'
          control={
            <Input
              name='title'
              placeholder='Kirjoita vaiheen otsikko...'
              defaultValue={step && step.title}
            />
          }
        />

        <FormControl
          required
          label='Aika'
          control={
            <Input
              name='time'
              type='date'
              defaultValue={time}
            />
          }
        />

        <FormControl
          label='Kuvaus'
          control={
            <textarea
              name='description'
              placeholder='Kirjoita vaiheen kuvaus...'
              defaultValue={step && step.description}
            />
          }
        />
      </Fieldset>
    </ObjectSubmissionForm>
  );
}
