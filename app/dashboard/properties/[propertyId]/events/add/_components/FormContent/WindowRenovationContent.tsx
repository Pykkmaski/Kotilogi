import { FormControl, Input } from '@/components/UI/FormUtils';
import { useEventContext } from '../EventContext';
import { useEventTypeContext } from '../EventTypeProvider';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export const WindowRenovationContent = () => {
  const { event: data } = useEventContext();
  const [windowData, setWindowData] = useState([]);

  const WindowDataControl = (data: TODO) => {
    return (
      <>
        <FormControl
          required
          label='U-Arvo'
          control={
            <Input
              placeholder='Anna ikkunan u-arvo'
              type='number'
              min={0}
              value={data.uValue}
              step={0.01}
            />
          }
        />
      </>
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      {windowData.map((d, i) => (
        <WindowDataControl data={d} />
      ))}
      <FormControl
        required
        label='U-Arvo'
        helper='Ikkunan lämmöneristyskyky.'
        control={
          <Input
            name='uValue'
            placeholder='Anna ikkunan u-arvo'
            type='number'
            min={0}
            value={data.uValue}
            step={0.1}
          />
        }
      />

      <FormControl
        required
        label={
          <>
            Vähimmäisäänieristyskyky <sup>dB</sup>
          </>
        }
        control={
          <Input
            placeholder='Anna ikkunan vähimmäisäänieristyskyky...'
            type='number'
            min={0}
            value={data.minSoundProofing}
            step={1}
          />
        }
      />

      <FormControl
        required
        label={
          <>
            Enimmäisäänieristyskyky <sup>dB</sup>
          </>
        }
        control={
          <Input
            placeholder='Anna ikkunan enimmäiseristyskyky...'
            type='number'
            min={0}
            value={data.maxSoundproofing}
            step={1}
          />
        }
      />

      <div className='flex items-center justify-end'>
        <Button
          variant='text'
          startIcon={<Add />}>
          Lisää toinen ikkuna
        </Button>
      </div>
    </div>
  );
};
