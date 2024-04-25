import { AddButton } from '@/components/Feature/GalleryBase/Buttons';
import { SearchBar } from '@/components/Feature/SearchBar';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function MobileDashboardLayout({ children }) {
  const session = (await getServerSession(options as any)) as any;

  return (
    <div className='flex w-full flex-col pt-2'>
      <header className='flex items-center w-full px-2 gap-2'>
        <SearchBar className='flex-1' />
        <AddButton />
      </header>
    </div>
  );
}
