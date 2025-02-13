import { FormControl, Input } from '../UI/FormUtils';
import { EditorContainer } from './EditorContainer';
import { RadioSelector } from './OptionSelector';
import { Checkbox } from './RadioGroup/Checkbox';

/**Toetutustapa */
export function DrainageDitchImplementationMethodSelector(props: Kotidok.SelectorProps) {
  return (
    <RadioSelector
      {...props}
      loadingText='Ladataan toteutustapoja...'
      labelKey='label'
      valueKey='label'
      label='Toteutustapa'
      tablename='restoration_events.drainage_ditch_implementation_method_type'
      name='implementation_method'
    />
  );
}

/**Salaojasepeli */
export function DrianageDitchGravelInput(props: Kotidok.SelectorProps) {
  return (
    <FormControl
      label={<>Salaojasepeli (mm)</>}
      control={
        <Input
          {...props}
          name='gravel_thickness'
          type='number'
          step='1'
          min='0'
          placeholder='Anna salaojasepelin raekoko...'
        />
      }
    />
  );
}

/**Routaeristys */
export function DrainageDitchPermafrostInsulationInput(props: Kotidok.SelectorProps) {
  return (
    <FormControl
      label={<>Routaeristys (mm)</>}
      control={
        <Input
          {...props}
          name='permafrost_insulation_thickness'
          type='number'
          step='1'
          min='0'
          placeholder='Anna routaeristyksen vahvuus...'
        />
      }
    />
  );
}

/**Murskereunus */
export function DrainageDitchCrushingEdgeInput(props: Kotidok.SelectorProps) {
  return (
    <FormControl
      label={<>Murskereunus (cm)</>}
      control={
        <Input
          {...props}
          name='gravel_lining'
          type='number'
          step='1'
          min='0'
          placeholder='Anna murskereunuksen leveys...'
        />
      }
    />
  );
}

type DrainageDitchEditorProps = {
  drainageDitchData: TODO;
  onChange: (e: any) => void;
};

export function DrainageDitchEditor({ drainageDitchData, onChange }: DrainageDitchEditorProps) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Salaojan tiedot</h1>
      <DrainageDitchImplementationMethodSelector
        value={drainageDitchData.implementation_method}
        onChange={onChange}
      />

      <DrianageDitchGravelInput
        value={drainageDitchData.gravel_thickness}
        onChange={onChange}
      />

      <DrainageDitchPermafrostInsulationInput
        value={drainageDitchData.permafrost_insulation_thickness}
        onChange={onChange}
      />

      <DrainageDitchCrushingEdgeInput
        value={drainageDitchData.gravel_lining}
        onChange={onChange}
      />

      <Checkbox
        label='Pumppukaivo'
        name='has_pump_well'
        checked={drainageDitchData.has_pump_well}
        onChange={onChange}
      />
      <Checkbox
        label='Sadevesiputket + suppilot'
        name='has_rainwater_pipes'
        checked={drainageDitchData.has_rainwater_pipes}
        onChange={onChange}
      />

      <Checkbox
        label='Suodatinkangas'
        name='has_filtration_cloth'
        checked={drainageDitchData.has_filtration_cloth}
        onChange={onChange}
      />

      <Checkbox
        label='Tarkastuskaivot'
        name='has_inspection_wells'
        checked={drainageDitchData.has_inspection_wells}
        onChange={onChange}
      />
      <Checkbox
        label='Kalliotyö'
        name='included_rock_construction'
        checked={drainageDitchData.included_rock_construction}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
