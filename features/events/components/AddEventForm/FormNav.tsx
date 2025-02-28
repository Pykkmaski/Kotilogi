import { Button } from '@/components/New/Button';
import { CarouselProvider } from '@/components/Util/CarouselProvider';

/**Renders the back- and forward button at the bottom of the event form. */
export const FormNav = () => {
  return (
    <div className='flex gap-2 w-full justify-end'>
      <CarouselProvider.PreviousTrigger>
        <Button
          color='secondary'
          variant='text'>
          Edellinen
        </Button>
      </CarouselProvider.PreviousTrigger>
      <CarouselProvider.NextTrigger>
        <Button
          color='secondary'
          variant='text'>
          Seuraava
        </Button>
      </CarouselProvider.NextTrigger>
    </div>
  );
};
