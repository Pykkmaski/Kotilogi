import { AppHeader } from '@/components/New/AppHeader';
import { Breadcrumb } from '@/components/New/Breadcrumb';
import { Margin } from '@/components/New/Margin';
import { Paper } from '@/components/New/Paper';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';

export default async function newDashboardLayout({ children }: React.PropsWithChildren) {
  const session = await loadSession();
  if (session && session.user.status == 0) {
    return redirect('/activate');
  }

  return (
    <div className='flex flex-col flex-1 w-full h-full'>
      <Margin>
        <Paper>
          <AppHeader />
          <div className='mb-4'>
            <Breadcrumb />
          </div>
          {children}
        </Paper>
      </Margin>
    </div>
  );
}
