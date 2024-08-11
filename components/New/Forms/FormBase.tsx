import Spinner from '@/components/UI/Spinner';
import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';

export function FormBase({ children, ...props }: React.ComponentProps<'form'>) {
  return (
    <form
      {...props}
      className='flex flex-col gap-4 p-2 bg-white shadow-md rounded-lg'>
      {children}
    </form>
  );
}

type FormButtonsProps = {
  backAction?: (e: TODO) => void;
  loading?: boolean;
  done?: boolean;
};

export function FormButtons({ backAction, loading, done }: FormButtonsProps) {
  return (
    <div className='flex gap-4 w-full justify-end'>
      <Button
        type='button'
        variant='text'
        onClick={backAction}>
        Takaisin
      </Button>
      <Button
        type='submit'
        disabled={loading || done}
        variant='contained'
        startIcon={!loading ? <Check /> : <Spinner size='1rem' />}>
        Vahvista
      </Button>
    </div>
  );
}
