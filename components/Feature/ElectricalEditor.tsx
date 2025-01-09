import { useCallback, useEffect, useState } from 'react';
import { EditorContainer } from './EditorContainer';
import { CheckboxSelector, OptionSelector } from './OptionSelector';
import { useQuery } from '@tanstack/react-query/build/legacy';
import { getElectricityJobTargets } from 'kotilogi-app/app/dashboard/properties/[propertyId]/events/add/_components/FormContent/actions';

type ElectricalEditorProps = {
  selectedTargets: number[];
  onChange: (id: number) => void;
};
export function ElectricalEditor({ selectedTargets, onChange }: ElectricalEditorProps) {
  return (
    <EditorContainer>
      <h1 className='font-semibold'>Sähkötyön tiedot</h1>
      <CheckboxSelector
        tablename='restoration_events.electricity_restoration_target_type'
        label='Sähkötyön kohteet'
        labelKey='label'
        valueKey='id'
        values={selectedTargets}
        onChange={onChange as TODO}
      />
    </EditorContainer>
  );
}
