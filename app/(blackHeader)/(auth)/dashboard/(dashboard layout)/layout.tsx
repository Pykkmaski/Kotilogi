import { LayoutContentContainer, LayoutNavBarContainer } from '@/components/UI/Layout';
import { DashboardMobileNav } from './DashboardMobileNav';
import { DesktopNavbarHeader } from './_components/DesktopNavbarHeader';
import { DesktopNav } from './_components/DesktopNav';

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
