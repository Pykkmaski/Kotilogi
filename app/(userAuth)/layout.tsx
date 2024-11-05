import { SiteHeader } from '@/components/App/SiteHeader';
import styles from './styles.module.css';

export default function UserAuthLayout({ children }) {
  return (
    <>
      <SiteHeader
        variant='auth'
        labelColorVariant='gray'
        showNavigation={false}
      />
      <div
        id='user-auth-layout-body'
        className={`w-full flex-1 flex flex-col gap-4 relative xs:px-4 lg:px-32 ${styles.layout}`}>
        {children}

        <img
          className='absolute top-0 right-0 z-0 lg:block xs:hidden h-screen aspect-auto'
          id='bg-design'
          src='/auth/Background Shape.png'
        />
      </div>
    </>
  );
}
