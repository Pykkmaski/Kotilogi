import { Heading } from '@/components/UI/Heading';

export function GalleryError(props: { title: string; message: string; icon: string }) {
  return (
    <div className={'flex flex-col gap-2 items-center justify-center'}>
      <span className='text-8xl text-slate-500'>
        <i className={`fa ${props.icon} text-6xl text-slate-500`} />
      </span>

      <Heading data-testId='gallery-error-title'>{props.title}</Heading>
      <p
        className={'text-center'}
        data-testId='gallery-error-message'>
        {props.message}
      </p>
    </div>
  );
}
