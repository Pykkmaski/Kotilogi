import { useBatchForm } from '@/hooks/useBatchForm';
import { EditorContainer } from './EditorContainer';
import { RadioSelector } from './OptionSelector';
import { Add, Clear } from '@mui/icons-material';
import { Button } from '../New/Button';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import { Notification } from '../UI/Notification';

export function InsulationMaterialSelector({
  index,
  ...props
}: Kotidok.SelectorProps & { index?: number }) {
  const name = index ? `insulation_material-${index}` : 'insulation_material';
  return (
    <RadioSelector
      {...props}
      name={name}
      label='Eristemateriaali'
      tablename='types.insulation_material_type'
      labelKey='label'
      valueKey='label'
      key={index ? `insulation-material-${index}` : null}
    />
  );
}

function InsulationTargetSelector({ index, ...props }: Kotidok.SelectorProps & { index: number }) {
  const name = `insulation_target-${index}`;

  return (
    <RadioSelector
      {...props}
      name={name}
      label='Eristyskohde'
      tablename='types.insulation_target_type'
      labelKey='label'
      valueKey='label'
      key={`insulation-target-${index}`}
    />
  );
}

export function Insulation({ data, index = 0, onChange, onDelete }) {
  return (
    <div className='flex flex-col gap-2 border border-slate-100 rounded-md p-2'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='font-semibold'>Eristys {index + 1}</h1>
        <IconButton
          onClick={onDelete}
          size='small'>
          <Clear />
        </IconButton>
      </div>

      <InsulationMaterialSelector
        index={index}
        value={data.insulation_material}
        onChange={onChange}
      />
      <InsulationTargetSelector
        index={index}
        value={data.insulation_target}
        onChange={onChange}
      />
    </div>
  );
}

export function InsulationEditor({ initialData, onChange }) {
  const { entries, removeEntry, updateEntry, addEntry } = useBatchForm(initialData);

  const addInsulation = () => {
    addEntry({});
  };

  const deleteInsulation = (id: number) => {
    const c = confirm('Haluatko varmasti poistaa eristyskohteen?');
    if (!c) return;

    removeEntry(id);
  };

  const updateInsulation = (e: any, id: number) => {
    const name = e.target.name.split('-').at(0);
    updateEntry(item => item.id == id, { [name]: e.target.value });
  };

  useEffect(() => {
    onChange(entries);
  }, [entries]);

  return (
    <EditorContainer>
      <h1 className='font-semibold'>Eristyksen tiedot</h1>
      {entries.length ? (
        entries.map((entry, i) => {
          return (
            <Insulation
              index={i}
              data={entry.value}
              onChange={e => updateInsulation(e, entry.id)}
              onDelete={() => deleteInsulation(entry.id)}
            />
          );
        })
      ) : (
        <Notification
          variant='default'
          position='start'>
          Ei lisättyjä eristyksiä.
        </Notification>
      )}
      <div className='flex justify-start'>
        <Button
          onClick={addInsulation}
          variant='text'
          color='secondary'
          startIcon={<Add />}>
          Lisää eristys
        </Button>
      </div>
    </EditorContainer>
  );
}
