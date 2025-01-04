import { SiteHeader } from '@/components/App/SiteHeader';
import styles from './styles.module.css';
import { Header } from '@/components/WFIndex/Header';

export default function UserAuthLayout({ children }) {
  return (
    <>
      <Header />
      <div className='flex w-full h-screen items-center justify-center relative'>
        <div className='bg-cta absolute top-0 left-0 w-full h-full z-0 grayscale bg-cover' />
        <div className='absolute top-0 left-0 w-full h-full z-10 bg-[#000a]' />
        {children}
      </div>
    </>
  );
}
