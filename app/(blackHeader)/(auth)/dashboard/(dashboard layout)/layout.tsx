import { NavBar } from 'kotilogi-app/components/NavBar/NavBar';
import IconLink from 'kotilogi-app/components/IconLink/IconLink';
import { Header } from 'kotilogi-app/components/Header/Header';
import { LayoutContentContainer, LayoutNavBarContainer } from 'kotilogi-app/components/Layout';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { DashboardContextProvider } from './DashboardContextProvider';
import { Group } from 'kotilogi-app/components/Group';
import { DashboardMobileNav } from './DashboardMobileNav';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';
import MobileDashboardLayout from './_mobile/MobileDashboardLayout';

export default async function DashboardLayout({ children }) {
  const session = (await getServerSession(options as any)) as {
    user: { email: string };
  };
  if (!session) throw new Error('Käyttäjän lataaminen epäonnistui!');

  return (
    <>
      <div className='lg:flex xs:flex w-full flex-1'>
        <LayoutNavBarContainer>
          <Header>
            <Group direction='col' gap={0}>
              <span className='text-white text-sm'>{session.user.email}</span>
              <h3 className='text-xl text-white'>Hallintapaneeli</h3>
            </Group>
          </Header>

          <NavBar>
            <div className='text-white'>
              <IconLink imageSrc='/icons/house.png' icon='fa-home' href='/dashboard/properties'>
                Talot
              </IconLink>
              <IconLink imageSrc='/icons/settings.png' icon='fa-cog' href='/dashboard/settings'>
                Asetukset
              </IconLink>
              <IconLink imageSrc='/icons/cart.png' icon='fa-shopping-cart' href='/dashboard/cart'>
                Ostoskori
              </IconLink>
            </div>
          </NavBar>
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
    </>
  );
}
