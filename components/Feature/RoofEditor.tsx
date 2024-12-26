import { RoofDataType } from 'kotilogi-app/dataAccess/types';
import { OptionSelector } from './OptionSelector';
import { FormControl, Input } from '../UI/FormUtils';
import { Checkbox } from './RadioGroup/Checkbox';
import { ColorSelector } from './BuildingEditor';
import { useEffect } from 'react';
import { EditorContainer } from './EditorContainer';

export function RoofTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      loadingText='Ladataan tyyppejä...'
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
      loadingText='Ladataan materiaaleja...'
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
      loadingText='Ladataan räystästyyppejä...'
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
      loadingText='Ladataan aluskatetyyppejä...'
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
      loadingText='Ladataan otsalautatyyppejä...'
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

export function RoofHasRoofBridgeCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      label='Kattosilta'
      name='kattosilta'
    />
  );
}

export function RoofHasChimneyCladdingCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='piipunpellitys'
      label='Hormin pellitys'
    />
  );
}

export function RoofHasWallLadderCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='seinatikas'
      label='Seinätikas'
    />
  );
}

export function RoofHasRidgeBoardCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='lapetikas'
      label='Lapetikas'
    />
  );
}

export function RoofHasUnderlayVentilationCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='harjatuuletusAluskatteella'
      label='Harjatuuletus aluskatteella'
    />
  );
}

export function RoofHasTreatedWoodCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='suojakasiteltyPuutavara'
      label='Suojakäsitelty puutavara'
    />
  );
}

export function RoofHasSnowBarrierCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='lumieste'
      label='Lumieste'
    />
  );
}

export function RoofHasGuttersCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='kourut'
      label='Kourut'
    />
  );
}

export function RoofHasDownspoutSystemCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='syoksysarja'
      label='Syöksysarja'
    />
  );
}

export function RoofHasSecurityLadderCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='turvatikas'
      label='Turvatikas'
    />
  );
}

type RoofEditorProps = {
  roofData: Partial<RoofDataType>;
  onChange: (e: any) => void;
};

export function RoofEditor({ roofData, onChange }: RoofEditorProps) {
  console.log('Roof data at roof editor: ', roofData);

  return (
    <EditorContainer>
      <h1 className='font-semibold'>Katon tiedot</h1>
      <RoofTypeSelector
        value={roofData.roofTypeId}
        onChange={onChange}
      />

      <RoofMaterialSelector
        value={roofData.roofMaterialId}
        onChange={onChange}
      />

      <ColorSelector
        value={roofData.colorId}
        onChange={onChange}
        name='colorId'
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

      <RoofHasRoofBridgeCheckbox
        checked={roofData.kattosilta}
        onChange={onChange}
      />

      <RoofHasChimneyCladdingCheckbox
        checked={roofData.piipunpellitys}
        onChange={onChange}
      />

      <RoofHasWallLadderCheckbox
        checked={roofData.seinatikas}
        onChange={onChange}
      />

      <RoofHasRidgeBoardCheckbox
        checked={roofData.lapetikas}
        onChange={onChange}
      />

      <RoofHasUnderlayVentilationCheckbox
        checked={roofData.harjatuuletusAluskatteella}
        onChange={onChange}
      />

      <RoofHasTreatedWoodCheckbox
        checked={roofData.suojakasiteltyPuutavara}
        onChange={onChange}
      />

      <RoofHasSnowBarrierCheckbox
        checked={roofData.lumieste}
        onChange={onChange}
      />

      <RoofHasGuttersCheckbox
        checked={roofData.kourut}
        onChange={onChange}
      />

      <RoofHasDownspoutSystemCheckbox
        checked={roofData.syoksysarja}
        onChange={onChange}
      />

      <RoofHasSecurityLadderCheckbox
        checked={roofData.turvatikas}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
