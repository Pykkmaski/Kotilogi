import { InfoOutlined } from '@mui/icons-material';
import { BooleanIcon } from './BooleanIcon';
import { DataDisplay } from './DataDisplay';

type RowDisplayProps<T extends Record<string, any>> = {
  data: T;
  keyHint?: { [x: string]: string };
  keyTranslator?: (key: keyof T) => string;
};

export function RowDisplay<T extends Record<string, any>>({
  data,
  keyHint,
  keyTranslator,
}: RowDisplayProps<T>) {
  //Separate the entries by type.
  const stringEntries =
    (data && Object.entries(data).filter(([key, val]) => typeof val === 'string')) || [];
  const numberEntries =
    (data && Object.entries(data).filter(([key, val]) => typeof val === 'number')) || [];
  const booleanEntries =
    (data && Object.entries(data).filter(([key, val]) => typeof val === 'boolean')) || [];
  const arrayEntries =
    (data && Object.entries(data).filter(([key, val]) => val instanceof Array)) || [];
  const entries = [...arrayEntries, ...stringEntries, ...numberEntries, ...booleanEntries];

  //Render the entries starting by strings, going to numbers, and lastly booleans.
  return entries.length ? (
    entries.map(([key, val]) => (
      <DataDisplay
        title={
          <div className='flex flex-row gap-4 items-center'>
            <span>{keyTranslator ? keyTranslator(key) : key}</span>
            {keyHint[key] && (
              <InfoOutlined
                titleAccess={keyHint[key]}
                sx={{ color: 'gray', fontSize: '1rem' }}
              />
            )}
          </div>
        }
        value={
          typeof val === 'boolean' ? (
            <BooleanIcon state={val} />
          ) : val instanceof Array ? (
            val.join(', ')
          ) : (
            val
          )
        }
      />
    ))
  ) : (
    <span>Ei tietoja.</span>
  );
}
