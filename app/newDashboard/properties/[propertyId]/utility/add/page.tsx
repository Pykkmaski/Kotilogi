import { Main } from '@/components/New/Main';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { FormControl, Input } from '@/components/UI/FormUtils';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { getUtilityTypeLabel, UtilityType } from 'kotilogi-app/models/enums/UtilityType';
import { getEnumAsDigits } from 'kotilogi-app/models/utils/getEnumAsDigits';
import { UtilityForm } from './_components/UtilityForm';
import db from 'kotilogi-app/dbconfig';

export default async function AddUtilityPage({ params }) {
  const propertyId = params.propertyId;
  const utilityTypes = await db('ref_utilityTypes');
  return (
    <Main>
      <UtilityForm
        propertyId={propertyId}
        utilityTypes={utilityTypes}
      />
    </Main>
  );
}
