import { Padding } from '@/components/UI/Padding';
import { Header } from './Header';
import styles from './styles.module.css';

export default function UserAuthLayout({ children }) {
  return (
    <div
      id='user-auth-layout'
      className={`w-full flex-1 flex flex-col gap-4 relative px-[130px] ${styles.layout}`}>
      <Header />
      {children}

      <embed
        className='absolute top-0 right-0'
        id='bg-design'
        type='image/svg+xml'
        src='/auth/Background Shape.png'
        height={'100%'}
      />
    </div>
  );
}
