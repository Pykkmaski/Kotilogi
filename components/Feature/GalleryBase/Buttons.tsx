import Button from '@/components/UI/Button/Button';
import { Add, Delete, PropaneTankSharp } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import MuiButton, { ButtonProps } from '@mui/material/Button';

export function DeleteButton(props: IconButtonProps) {
  return (
    <IconButton
      color='warning'
      {...props}>
      <Delete />
    </IconButton>
  );
}

export function AddButton({ children, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      startIcon={<Add />}
      variant='text'>
      Lisää Uusi
    </MuiButton>
  );
}

export function DeactivateButton(props: React.ComponentProps<'button'>) {
  return (
    <Button
      variant='primary'
      {...props}
      title='Poista valitut kohteet käytöstä...'>
      <div className='flex gap-2 border-slate-500 items-center'>
        <i className='fa fa-ban text-slate-500 text-2xl' />
        <span>Poista käytöstä</span>
      </div>
    </Button>
  );
}
