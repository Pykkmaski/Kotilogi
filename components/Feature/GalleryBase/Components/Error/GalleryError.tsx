import { StaticImageData } from 'next/image';
import styles from './error.module.scss';
import { Heading } from '@/components/UI/Heading';

export function GalleryError(props: { title: string; message: string; icon: string }) {
  return (
    <div className={styles.errorContainer}>
      <span className='text-8xl text-slate-500'>
        <i className={`fa ${props.icon} text-6xl text-slate-500`} />
      </span>

      <Heading
        className={styles.errorTitle}
        data-testId='gallery-error-title'>
        {props.title}
      </Heading>
      <p
        className={styles.errorMessage}
        data-testId='gallery-error-message'>
        {props.message}
      </p>
    </div>
  );
}
