import IconLink from '@/components/UI/IconLink';
import { NavBar } from '@/components/UI/NavBar';

export function DesktopNav() {
  return (
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
  );
}
