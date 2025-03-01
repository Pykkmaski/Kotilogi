import { useEventFormContext } from 'kotilogi-app/features/events/components/AddEventForm/EventFormContext';
import { FormControl, Input } from '../UI/FormUtils';
import { InsulationMaterialSelector } from './InsulationEditor';
import { RadioSelector } from './OptionSelector';
import { Checkbox } from './RadioGroup/Checkbox';
import { useEffect } from 'react';

type ExteriorCladdingEditorProps = {
  value: TODO;
  onChange: (e: TODO) => void;
};

export function ExteriorCladdingEditor({ onChange }: ExteriorCladdingEditorProps) {
  const { payload, resetPayload } = useEventFormContext();

  useEffect(() => {
    const newPayload = {
      ...payload,
      has_ventilation_gap: payload.ventilation_gap !== undefined,
      has_wind_protection_plate: payload.wind_protection_plate_thickness !== undefined,
      has_wind_insulation: payload.wind_insulation_thickness !== undefined,
      has_additional_insulation:
        Object.entries(payload)
          .filter(([key, value]) => key !== 'exterior_cladding_material')
          .map(([key, value]) => value !== undefined || value !== null).length > 0,
    };

    resetPayload(newPayload);
  }, []);

  useEffect(() => {
    //Reset the ventilation gap if the checkbox is untoggled.
    if (payload.has_ventilation_gap === false && payload.ventilation_gap !== undefined) {
      resetPayload({ ...payload, ventilation_gap: undefined });
    }
  }, [payload.has_ventilation_gap]);

  useEffect(() => {
    //Reset the wind insulation thickness if the checkbox is untoggled.
    if (payload.has_wind_insulation === false && payload.wind_insulation_thickness !== undefined) {
      resetPayload({ ...payload, wind_insulation_thickness: undefined });
    }
  }, [payload.has_wind_insulation]);

  useEffect(() => {
    //Reset the wind protection plate thickness if the checkbox is untoggled.
    if (
      payload.has_wind_protection_plate === false &&
      payload.wind_protection_plate_thickness !== undefined
    ) {
      resetPayload({ ...payload, wind_protection_plate_thickness: undefined });
    }
  }, [payload.has_wind_protection_plate]);

  const hasWindInsulation = payload.has_wind_insulation;
  const hasWindProtectionPlate = payload.has_wind_protection_plate;
  const hasVentilationGap = payload.has_ventilation_gap;
  const hasAdditionalInsulation = payload.has_additional_insulation;

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='font-semibold'>Ulkoverhouksen tiedot</h1>
      <ExteriorCladdingMaterialSelector
        value={payload.exterior_cladding_material}
        onChange={onChange}
      />

      <Checkbox
        label='Lisäeristys'
        name='has_additional_insulation'
        checked={hasAdditionalInsulation}
        onChange={onChange}
      />

      {hasAdditionalInsulation ? (
        <>
          <div className='flex flex-col gap-2 pb-2'>
            <InsulationMaterialSelector
              value={payload.insulation_material}
              onChange={onChange}
            />
            <InsulationThicknessField
              value={payload.insulation_thickness}
              onChange={onChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Checkbox
              name='has_wind_insulation'
              label='Tuulensuojaeriste'
              checked={hasWindInsulation}
              onChange={onChange}
            />
            {hasWindInsulation && (
              <WindInsulationThicknessField
                value={payload.wind_insulation_thickness}
                onChange={onChange}
              />
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <Checkbox
              label='Tuulensuojalevy'
              name='has_wind_protection_plate'
              onChange={onChange}
              checked={hasWindProtectionPlate}
            />
            {hasWindProtectionPlate ? (
              <WindProtectionPlateField
                value={payload.wind_protection_plate_thickness}
                onChange={onChange}
              />
            ) : null}
          </div>

          <Checkbox
            label='Höyrysulku'
            value={payload.has_vapour_barrier}
            checked={payload.has_vapour_barrier}
            onChange={onChange}
          />

          <Checkbox
            label='Jyrsijäverkko'
            checked={payload.has_rodent_net}
            name='has_rodent_net'
            onChange={onChange}
            value={payload.has_rodent_net}
          />

          <div className='flex flex-col gap-2'>
            <Checkbox
              label='Tuuletusrako'
              name='has_ventilation_gap'
              checked={hasVentilationGap}
              onChange={onChange}
            />
            {hasVentilationGap && (
              <VentilationGapField
                value={payload.ventilation_gap}
                onChange={onChange}
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

function ExteriorCladdingMaterialSelector({ value, onChange }: React.ComponentProps<'input'>) {
  return (
    <RadioSelector
      label='Materiaali'
      loadingText='Ladataan materiaaleja...'
      tablename='types.exterior_cladding_material_type'
      name='exterior_cladding_material'
      onChange={e => onChange(e)}
      value={value}
      labelKey='label'
      valueKey='label'
    />
  );
}

function WindProtectionPlateField({ value, onChange }: any) {
  return (
    <FormControl
      label={<>Tuulensuojalevun paksuus (mm)</>}
      control={
        <Input
          type='number'
          name='wind_protection_plate_thickness'
          value={value}
          onChange={onChange}
          min={0}
          step={1}
          placeholder='Tuulensuojalevyn paksuus millimetreissä...'
        />
      }
    />
  );
}

function WindInsulationThicknessField({ value, onChange }) {
  return (
    <FormControl
      label='Tuulensuojaeristeen paksuus (mm)'
      control={
        <Input
          name='wind_insulation_thickness'
          value={value}
          type='number'
          step={1}
          min={0}
          placeholder='Anna tuulensuojaeristeen paksuus...'
          onChange={onChange}
        />
      }
    />
  );
}

function VentilationGapField({ value, onChange }: any) {
  return (
    <FormControl
      label='Tuuletusraon leveys (mm)'
      control={
        <Input
          value={value}
          name='ventilation_gap'
          onChange={onChange}
          placeholder='Anna tuuletusraon leveys...'
          type='number'
        />
      }
    />
  );
}

function InsulationThicknessField({ value, onChange }) {
  return (
    <FormControl
      label={<>Eristyksen paksuus (mm)</>}
      control={
        <Input
          name='insulation_thickness'
          value={value}
          onChange={onChange}
          type='number'
          placeholder='Anna eristyksen paksuus millimetreissä...'
          min={1}
          step={1}
        />
      }
    />
  );
}
