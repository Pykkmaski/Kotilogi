import { StaticImageData } from 'next/image';
import styles from './error.module.scss';
import Image from 'next/image';
import { Heading } from '@/components/UI/Heading';

export function GalleryError(props: { title: string; message: string; icon: string }) {
  return (
    <div className={styles.errorContainer}>
      <Image
        src={props.icon}
        className={styles.errorImage}
        width={70}
        height={70}
        alt='Error Image'
      />
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
