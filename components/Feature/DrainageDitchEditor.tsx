import { FormControl, Input } from '../UI/FormUtils';
import { EditorContainer } from './EditorContainer';
import { OptionSelector } from './OptionSelector';
import { Checkbox } from './RadioGroup/Checkbox';

/**Toetutustapa */
export function DrainageDitchImplementationMethodSelector(props: Kotidok.SelectorProps) {
  return (
    <OptionSelector
      {...props}
      loadingText='Ladataan toteutustapoja...'
      labelKey='label'
      valueKey='id'
      label='Toteutustapa'
      tablename='restoration_events.drainage_ditch_implementation_method_type'
      name='toteutusTapaId'
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
          name='salaojaSepeli'
          type='number'
          step='0.01'
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
          name='routaEristys'
          type='number'
          step='0.01'
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
          name='murskeReunus'
          type='number'
          step='0.01'
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
        value={drainageDitchData.toteutusTapaId}
        onChange={onChange}
      />

      <DrianageDitchGravelInput
        value={drainageDitchData.salaojaSepeli}
        onChange={onChange}
      />

      <DrainageDitchPermafrostInsulationInput
        value={drainageDitchData.routaEristys}
        onChange={onChange}
      />

      <DrainageDitchCrushingEdgeInput
        value={drainageDitchData.murskeReunus}
        onChange={onChange}
      />

      <Checkbox
        label='Pumppukaivo'
        name='pumppuKaivo'
        checked={drainageDitchData.pumppuKaivo}
        onChange={onChange}
      />
      <Checkbox
        label='Sadevesiputket + suppilot'
        name='sadevesiPutket'
        checked={drainageDitchData.sadevesiPutket}
        onChange={onChange}
      />

      <Checkbox
        label='Suodatinkangas'
        name='suodatinKangas'
        checked={drainageDitchData.suodatinKangas}
        onChange={onChange}
      />

      <Checkbox
        label='Tarkastuskaivot'
        name='tarkastusKaivot'
        checked={drainageDitchData.tarkastusKaivot}
        onChange={onChange}
      />
      <Checkbox
        label='Kalliotyö'
        name='kallioTyo'
        checked={drainageDitchData.kallioTyo}
        onChange={onChange}
      />
    </EditorContainer>
  );
}
