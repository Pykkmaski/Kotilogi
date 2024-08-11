'use client';

import { ADeleteEventStep } from '@/actions/eventSteps';
import { ADeleteProperty } from '@/actions/properties';
import { FormBase } from '@/components/New/Forms/FormBase';
import { ObjectDeletionForm } from '@/components/New/Forms/ObjectDeletionForm';
import { MainHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { FormStatus, useDataSubmissionForm } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import {
  AppartmentDataType,
  EventStepDataType,
  HouseDataType,
  PropertyDataType,
} from 'kotilogi-app/models/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

type DeletePropertyFormProps = {
  step: EventStepDataType & {
    propertyId: string;
  };
};

export function DeleteStepForm({ step }: DeletePropertyFormProps) {
  return (
    <ObjectDeletionForm
      returnUrl={`/newDashboard/properties/${step.propertyId}/events/${step.parentId}/steps`}
      objectId={step.id}
      deleteMethod={async data => {
        return await ADeleteEventStep(step.id).then(res => {
          if (res == -1) {
            toast.error('Vaiheen voi poistaa ainoastaan sen luoja!');
          } else {
            toast.success('Vaihe poistettu!');
          }
          return res;
        });
      }}>
      <MainHeading>Poista vaihe</MainHeading>
      <p className='text-lg mb-4'>
        Olet poistamassa vaihetta <span className='font-semibold'>{step.title}</span>. Oletko varma?
      </p>
    </ObjectDeletionForm>
  );
}
