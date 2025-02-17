import { RoofDataType } from 'kotilogi-app/dataAccess/types';
import { RadioSelector } from './OptionSelector';
import { FormControl, Input } from '../UI/FormUtils';
import { Checkbox } from './RadioGroup/Checkbox';
import { EditorContainer } from './EditorContainer';
import { CustomizableSelector } from './CustomizableSelector';
import { RoofMaterial, roofSchema, RoofType } from 'kotilogi-app/utils/models/roofSchema';

export function RoofTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <RadioSelector
      label='Katon tyyppi'
      loadingText='Ladataan tyyppejä...'
      name='roof_type'
      value={value}
      onChange={onChange}
      valueKey='name'
      labelKey='name'
      tablename='types.roof_type'
    />
  );
}

export function RoofMaterialSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <RadioSelector
      label='Katon materiaali'
      loadingText='Ladataan materiaaleja...'
      value={value}
      name='roof_material'
      onChange={onChange}
      valueKey='name'
      labelKey='name'
      tablename='types.roof_material_type'
    />
  );
}

export function RoofEavesTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <RadioSelector
      {...props}
      loadingText='Ladataan räystästyyppejä...'
      labelKey='label'
      valueKey='label'
      label='Räystästyyppi'
      tablename='types.roof_eaves_type'
      value={value}
      name='eaves_type'
      onChange={onChange}
    />
  );
}

export function RoofUnderlaymentTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <RadioSelector
      {...props}
      loadingText='Ladataan aluskatetyyppejä...'
      labelKey='label'
      valueKey='label'
      label='Aluskatetyyppi'
      tablename='types.roof_underlacing_type'
      value={value}
      name='underlacing_type'
      onChange={onChange}
    />
  );
}

export function RoofFasciaBoardTypeSelector({ value, onChange, ...props }: Kotidok.SelectorProps) {
  return (
    <RadioSelector
      {...props}
      loadingText='Ladataan otsalautatyyppejä...'
      labelKey='label'
      valueKey='label'
      label='Otsalautatyyppi'
      tablename='types.roof_fascia_board_type'
      value={value}
      name='fascia_board_type'
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
          name='incline'
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
          type='number'
          name='area'
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
      name='has_roof_bridge'
    />
  );
}

export function RoofHasChimneyCladdingCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='has_chimney_plating'
      label='Hormin pellitys'
    />
  );
}

export function RoofHasWallLadderCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='has_ladder'
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
      name='has_underlacing_ventilation'
      label='Harjatuuletus aluskatteella'
    />
  );
}

export function RoofHasTreatedWoodCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='has_treated_wood'
      label='Suojakäsitelty puutavara'
    />
  );
}

export function RoofHasSnowBarrierCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='has_snow_barrier'
      label='Lumieste'
    />
  );
}

export function RoofHasGuttersCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='has_gutters'
      label='Kourut'
    />
  );
}

export function RoofHasDownspoutSystemCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='has_downspout_system'
      label='Syöksysarja'
    />
  );
}

export function RoofHasSecurityLadderCheckbox(props: Kotidok.CheckboxSelectorProps) {
  return (
    <Checkbox
      {...props}
      name='has_security_ladder'
      label='Turvatikas'
    />
  );
}

function ColorSelector(props: any) {
  return (
    <RadioSelector
      {...props}
      labelKey='name'
      valueKey='name'
      label='Väri'
      name={props.name}
      tablename='public.ref_mainColors'
    />
  );
}
type RoofEditorProps = {
  roofData: Partial<RoofDataType>;
  onChange: (e: any) => void;
};

export function RoofEditor({ roofData, onChange }: RoofEditorProps) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Katon tiedot</h1>
      <RoofTypeSelector
        value={roofData.roof_type}
        onChange={onChange}
      />

      <RoofMaterialSelector
        value={roofData.roof_material}
        onChange={onChange}
      />

      <ColorSelector
        value={roofData.color}
        onChange={onChange}
        name='color'
      />

      <RoofEavesTypeSelector
        value={roofData.eaves_type}
        onChange={onChange}
      />

      <RoofUnderlaymentTypeSelector
        value={roofData.underlacing_type}
        onChange={onChange}
      />

      <RoofFasciaBoardTypeSelector
        value={roofData.fascia_board_type}
        onChange={onChange}
      />

      <RoofInclineInput
        value={roofData.incline}
        onChange={onChange}
      />

      <RoofAreaInput
        value={roofData.area}
        onChange={onChange}
      />

      <RoofHasRoofBridgeCheckbox
        checked={roofData.has_roof_bridge}
        onChange={onChange}
      />

      <RoofHasChimneyCladdingCheckbox
        checked={roofData.has_chimney_plating}
        onChange={onChange}
      />

      <RoofHasWallLadderCheckbox
        checked={roofData.has_ladder}
        onChange={onChange}
      />

      <RoofHasRidgeBoardCheckbox
        checked={roofData.lapetikas}
        onChange={onChange}
      />

      <RoofHasUnderlayVentilationCheckbox
        checked={roofData.has_underlacing_ventilation}
        onChange={onChange}
      />

      <RoofHasTreatedWoodCheckbox
        checked={roofData.has_treated_wood}
        onChange={onChange}
      />

      <RoofHasSnowBarrierCheckbox
        checked={roofData.has_snow_barrier}
        onChange={onChange}
      />

      <RoofHasGuttersCheckbox
        checked={roofData.has_gutters}
        onChange={onChange}
      />

      <RoofHasDownspoutSystemCheckbox
        checked={roofData.has_downspout_system}
        onChange={onChange}
      />

      <RoofHasSecurityLadderCheckbox
        checked={roofData.has_security_ladder}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
