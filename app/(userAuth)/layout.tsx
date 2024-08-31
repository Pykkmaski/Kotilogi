import Header from '@/components/App/Header';

export default function UserAuthLayout({ children }) {
  return (
    <div
      id='user-auth-layout'
      className='bg-gradient-to-b from-white to-[#E0FFE7] w-full h-full flex flex-col gap-4'>
      <Header />
      {children}
    </div>
  );
}
