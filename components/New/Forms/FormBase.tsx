import Spinner from '@/components/UI/Spinner';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
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
  submitDisabled?: boolean;
  loading?: boolean;
  done?: boolean;
};

export function FormButtons({ backAction, loading, done, submitDisabled }: FormButtonsProps) {
  return (
    <div className='flex gap-4 w-full justify-end'>
      <Button
        type='button'
        variant='text'
        onClick={backAction}
        disabled={loading || done}>
        Takaisin
      </Button>
      <Button
        type='submit'
        disabled={loading || done || submitDisabled}
        variant='contained'
        startIcon={
          <RenderOnCondition
            condition={!loading}
            fallback={<Spinner />}>
            <Check />
          </RenderOnCondition>
        }>
        Vahvista
      </Button>
    </div>
  );
}
