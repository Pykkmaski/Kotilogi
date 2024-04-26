import { NavBar } from '@/components/UI/NavBar';
import IconLink from '@/components/UI/IconLink';
import { Header } from '@/components/UI/Header/Header';
import { LayoutContentContainer, LayoutNavBarContainer } from '@/components/UI/Layout';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { DashboardContextProvider } from './DashboardContextProvider';
import { Group } from '@/components/UI/Group';
import { DashboardMobileNav } from './DashboardMobileNav';
import MobileDashboardLayout from './_mobile/MobileDashboardLayout';

export default async function DashboardLayout({ children }) {
  const session = (await getServerSession(options as any)) as {
    user: { email: string };
  };
  if (!session) throw new Error('Käyttäjän lataaminen epäonnistui!');

  return (
    <div className='lg:bg-gray-600 xs:bg-black xs:h-screen lg:h-auto'>
      <div className='lg:flex xs:flex w-full flex-1 h-full'>
        <LayoutNavBarContainer>
          <Header>
            <Group
              direction='col'
              gap={0}>
              <span className='text-white text-sm'>{session.user.email}</span>
              <h3 className='text-xl text-white'>Hallintapaneeli</h3>
            </Group>
          </Header>
          <nav className='text-white flex flex-col gap-2'>
            <NavBar>
              <IconLink
                imageSrc='/icons/house.png'
                icon='fa-home'
                href='/dashboard/properties'>
                Talot
              </IconLink>
              <IconLink
                imageSrc='/icons/settings.png'
                icon='fa-cog'
                href='/dashboard/settings'>
                Asetukset
              </IconLink>
              <IconLink
                imageSrc='/icons/cart.png'
                icon='fa-shopping-cart'
                href='/dashboard/cart'>
                Ostoskori
              </IconLink>
            </NavBar>
          </nav>
        </LayoutNavBarContainer>

        <DashboardContextProvider user={session.user}>
          <LayoutContentContainer>
            <div className='xs:block lg:hidden flex flex-col mb-10'>
              <small className='text-slate-500 text-sm'>Hallintapaneeli</small>
              <h1 className='text-lg'>{session.user.email}</h1>
            </div>

            <div className='xs:pb-8 lg:pb-0'>{children}</div>
            <DashboardMobileNav />
          </LayoutContentContainer>
        </DashboardContextProvider>
      </div>

      <div className='xs:hidden lg:hidden'>
        <MobileDashboardLayout>{children}</MobileDashboardLayout>
      </div>
    </div>
  );
}
