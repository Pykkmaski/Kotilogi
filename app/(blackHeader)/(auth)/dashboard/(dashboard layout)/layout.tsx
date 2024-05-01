import { NavBar } from '@/components/UI/NavBar';
import IconLink from '@/components/UI/IconLink';
import { Header } from '@/components/UI/Header/Header';
import { LayoutContentContainer, LayoutNavBarContainer } from '@/components/UI/Layout';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { UserProvider } from '../../UserProvider';
import { Group } from '@/components/UI/Group';
import { DashboardMobileNav } from './DashboardMobileNav';
import MobileDashboardLayout from './_mobile/MobileDashboardLayout';
import { DesktopNavbarHeader } from './_components/DesktopNavbarHeader';
import { DesktopNav } from './_components/DesktopNav';
import { MobileContentHeader } from './_components/MobileContentHeader';

export default async function DashboardLayout({ children }) {
  return (
    <div className='lg:bg-gray-600 xs:bg-black xs:h-screen lg:h-auto'>
      <div className='lg:flex xs:flex w-full flex-1 h-full'>
        <LayoutNavBarContainer>
          <DesktopNavbarHeader />
          <DesktopNav />
        </LayoutNavBarContainer>

        <LayoutContentContainer>
          <div className='xs:pb-8 lg:pb-0'>{children}</div>
          <DashboardMobileNav />
        </LayoutContentContainer>
      </div>
    </div>
  );
}
