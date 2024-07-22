import { Main } from '@/components/New/Main';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { getUtilityTypeLabel, UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { UtilityForm } from './_components/UtilityForm';

export default async function AddUtilityPage({ params }) {
  const propertyId = params.propertyId;

  return (
    <Main>
      <UtilityForm propertyId={propertyId} />
    </Main>
  );
}
