import { RoofDataType } from 'kotilogi-app/dataAccess/types';
import { OptionSelector } from './OptionSelector';
import { FormControl, Input } from '../UI/FormUtils';

export function RoofTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      labelKey='name'
      valueKey='id'
      label='Katon tyyppi'
      tablename='roofs.types'
      value={value}
      name='roofTypeId'
      onChange={onChange}
    />
  );
}

export function RoofMaterialSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      labelKey='name'
      valueKey='id'
      label='Katon materiaali'
      tablename='roofs.materials'
      value={value}
      name='roofMaterialId'
      onChange={onChange}
    />
  );
}

export function RoofEavesTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      labelKey='label'
      valueKey='id'
      label='Räystästyyppi'
      tablename='roofs.ref_raystastyypit'
      value={value}
      name='raystasTyyppiId'
      onChange={onChange}
    />
  );
}

export function RoofUnderlaymentTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      labelKey='label'
      valueKey='id'
      label='Aluskatetyyppi'
      tablename='roofs.ref_aluskatetyypit'
      value={value}
      name='aluskateTyyppiId'
      onChange={onChange}
    />
  );
}

export function RoofFasciaBoardTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      labelKey='label'
      valueKey='id'
      label='Otsalautatyyppi'
      tablename='roofs.ref_otsalautatyypit'
      value={value}
      name='otsalautaTyyppiId'
      onChange={onChange}
    />
  );
}

export function RoofInclineInput(props: Kotidok.SelectorProps) {
  return (
    <FormControl
      label='Kaltevuus'
      control={
        <Input
          {...props}
          name='kaltevuus'
          placeholder='Anna katon kaltevuus...'
        />
      }
    />
  );
}

export function RoofAreaInput(props: Kotidok.SelectorProps) {
  return (
    <FormControl
      label='Katto neliömetreinä'
      control={
        <Input
          {...props}
          name='neliometrit'
          placeholder='Anna katon neliömetrit...'
        />
      }
    />
  );
}

type RoofEditorProps = {
  roofData: Partial<RoofDataType>;
  onChange: (e: any) => void;
};

export function RoofEditor({ roofData, onChange }: RoofEditorProps) {
  return (
    <div className='flex flex-col gap-4'>
      <RoofTypeSelector
        value={roofData.roofTypeId}
        onChange={onChange}
      />

      <RoofMaterialSelector
        value={roofData.roofMaterialId}
        onChange={onChange}
      />

      <RoofEavesTypeSelector
        value={roofData.raystasTyyppiId}
        onChange={onChange}
      />

      <RoofUnderlaymentTypeSelector
        value={roofData.aluskateTyyppiId}
        onChange={onChange}
      />

      <RoofFasciaBoardTypeSelector
        value={roofData.otsalautaTyyppiId}
        onChange={onChange}
      />

      <RoofInclineInput
        value={roofData.kaltevuus}
        onChange={onChange}
      />

      <RoofAreaInput
        value={roofData.neliometrit}
        onChange={onChange}
      />
    </div>
  );
}
