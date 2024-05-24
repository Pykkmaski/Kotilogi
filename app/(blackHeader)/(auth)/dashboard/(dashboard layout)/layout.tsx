import { LayoutContentContainer, LayoutNavBarContainer } from '@/components/UI/Layout';
import { DashboardMobileNav } from './DashboardMobileNav';
import { DesktopNavbarHeader } from './_components/DesktopNavbarHeader';
import { DesktopNav } from './_components/DesktopNav';
import { BottomNav, NavAction } from '@/components/App/BottomNav';
import { Home, Settings, ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';

export default async function DashboardLayout({ children }) {
  return (
    <div className='lg:bg-gray-600 xs:bg-black xs:h-screen'>
      <div className='lg:flex xs:flex w-full flex-1 h-full'>
        <LayoutNavBarContainer>
          <DesktopNavbarHeader />
          <DesktopNav />
        </LayoutNavBarContainer>

        <LayoutContentContainer>
          <div className='xs:pb-8 lg:pb-0 min-h-full'>{children}</div>
          <DashboardMobileNav />
        </LayoutContentContainer>
      </div>
    </div>
  );
}
