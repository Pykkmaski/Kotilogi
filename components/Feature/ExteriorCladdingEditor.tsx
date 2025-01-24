import { FormControl, Input } from '../UI/FormUtils';
import { ToggleProvider } from '../Util/ToggleProvider';
import { InsulationMaterialSelector } from './InsulationEditor';
import { RadioSelector } from './OptionSelector';
import { Checkbox } from './RadioGroup/Checkbox';
import { ChipRadioGroup } from './RadioGroup/ChipRadioGroup';

function ExteriorCladdingMaterialSelector({ value, onChange }: React.ComponentProps<'input'>) {
  return (
    <RadioSelector
      label='Materiaali'
      loadingText='Ladataan materiaaleja...'
      tablename='types.exterior_cladding_material_type'
      name='exterior_cladding_material_type_id'
      onChange={e => onChange(e)}
      value={value}
      labelKey='label'
      valueKey='id'
    />
  );
}

type ExteriorCladdingEditorProps = {
  value: TODO;
  onChange: (e: TODO) => void;
};

export function ExteriorCladdingEditor({ value, onChange }: ExteriorCladdingEditorProps) {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='font-semibold'>Ulkoverhouksen tiedot</h1>
      <ExteriorCladdingMaterialSelector
        value={value.exterior_cladding_material_type_id}
        onChange={onChange}
      />
      <Checkbox
        label='Jyrsijäverkko'
        checked={value.has_rodent_net}
        name='has_rodent_net'
        onChange={onChange}
        value={value.has_rodent_net}
      />

      <div className='flex flex-col gap-2 border-b border-slate-200 pb-2'>
        <InsulationMaterialSelector
          value={value.insulation_material_id}
          onChange={onChange}
        />
        <FormControl
          label={<>Eristyksen paksuus (mm)</>}
          control={
            <Input
              name='insulation_thickness'
              value={value.insulation_thickness}
              onChange={onChange}
              type='number'
              placeholder='Anna eristyksen paksuus millimetreissä...'
              min={1}
              step={1}
            />
          }
        />
        <Checkbox
          label='Höyrysulku'
          value={value.has_vapour_barrier}
          checked={value.has_vapour_barrier}
          onChange={onChange}
        />
      </div>

      <Checkbox
        label='Lisäeristys'
        value={value.has_additional_insulation}
        name='has_additional_insulation'
        checked={value.has_additional_insulation}
        onChange={onChange}
      />

      {value.has_additional_insulation ? (
        <>
          <Checkbox
            name='has_wind_protection'
            label='Tuulensuojaeriste'
            value={value.has_wind_protection}
            checked={value.has_wind_protection}
            onChange={onChange}
          />
          <div className='flex flex-col gap-2'>
            <Checkbox
              label='Tuulensuojalevy'
              name='has_wind_protection_plate'
              value={value.has_wind_protection_plate}
              onChange={onChange}
              checked={value.has_wind_protection_plate}
            />
            {value.has_wind_protection_plate ? (
              <FormControl
                label={<>Tuulensuojalevun paksuus (mm)</>}
                control={
                  <Input
                    type='number'
                    name='wind_protection_plate_thickness'
                    value={
                      //Set to null if the user untoggles the checkbox for the wind protection plate.
                      value.has_wind_protection_plate ? value.wind_protection_plate_thickness : null
                    }
                    onChange={onChange}
                    min={0}
                    step={1}
                    placeholder='Tuulensuojalevyn paksuus millimetreissä...'
                  />
                }
              />
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
