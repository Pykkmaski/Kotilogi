import { Check, Warning } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import green from '@mui/material/colors/green';

type PropertyOverviewProps = {
  selectedProperty: Kotidok.PropertyType;
};

export function PropertyOverview({ selectedProperty }: PropertyOverviewProps) {
  return (
    <section className='mt-4'>
      <div className='flex xs:justify-between lg:justify-normal gap-4 w-full'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-4'>
            <Typography variant='h5'>
              {selectedProperty.title + selectedProperty.appartmentNumber || null}
            </Typography>
            {selectedProperty.status === 'ok' ? (
              <Check
                sx={{ color: green[700] }}
                titleAccess='Talo on käytössä.'
              />
            ) : (
              <Warning
                titleAccess='Talo vaatii toimenpiteitä.'
                sx={{ color: red[700] }}
              />
            )}
          </div>

          <Typography
            className='text-slate-500'
            variant='subtitle1'>
            {selectedProperty.buildingType}
          </Typography>
        </div>
      </div>
    </section>
  );
}
