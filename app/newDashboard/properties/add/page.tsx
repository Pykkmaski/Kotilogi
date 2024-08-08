import { Main } from '@/components/New/Main';
import { PropertyForm } from './_components/PropertyForm';
import { TargetTypeField } from '../../_components/NewAddPropertyModal/Form/TargetTypeField';

export default function AddPropertyPage() {
  return (
    <Main>
      <PropertyForm>
        <TargetTypeField />
      </PropertyForm>
    </Main>
  );
}
