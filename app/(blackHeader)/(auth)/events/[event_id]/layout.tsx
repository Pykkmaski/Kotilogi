import { FooterNav } from '@/components/Feature/FooterNav';
import { Group } from '@/components/UI/Group';
import { Header } from '@/components/UI/Header/Header';
import { SecondaryHeading } from '@/components/UI/Heading';
import IconLink from '@/components/UI/IconLink';
import { LayoutContentContainer, LayoutNavBarContainer, NavDivider } from '@/components/UI/Layout';
import { NavBar } from '@/components/UI/NavBar';
import db from 'kotilogi-app/dbconfig';
import { MobileNavbar } from './MobileNavbar';

export default async function EventLayout({ children, params }) {
  const event = await db('propertyEvents').where({ id: params.event_id }).first();
  if (!event) throw new Error('Tapahtuman lataus epäonnistui!');

  const [property] = await db('properties').where({ id: event.refId });
  if (property.status == 'deactivated') {
    throw new Error('Käytöstä poistetun talon tietoja ei voi muokata!');
  }

  return (
    <div className='flex gap-4 w-full flex-1 lg:bg-gray-600 xs:bg-black'>
      <LayoutNavBarContainer>
        <Header>
          <Group
            direction='col'
            gap={0}>
            <SecondaryHeading>
              <span className='text-white'>Tapahtuma</span>
            </SecondaryHeading>
            <span className='text-white text-xl max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap'>
              {event.title}
            </span>
          </Group>
        </Header>

        <NavBar>
          <div className='text-white'>
            <IconLink
              href={`info`}
              imageSrc='/icons/info.png'
              icon='fa-info-circle'>
              Tiedot
            </IconLink>
            <IconLink
              href={'images'}
              imageSrc='/icons/image.png'
              icon='fa-image'>
              Kuvat
            </IconLink>
            <IconLink
              href={'files'}
              imageSrc='/icons/copy.png'
              icon='fa-copy'>
              Tiedostot
            </IconLink>
            <NavDivider />
            <IconLink
              href={`/properties/${event.refId}/events`}
              imageSrc='/icons/history.png'
              icon='fa-history'>
              Takaisin Tapahtumiin
            </IconLink>
          </div>
        </NavBar>
      </LayoutNavBarContainer>

      <LayoutContentContainer>
        <div className='xs:block lg:hidden flex flex-col mb-10'>
          <small className='text-slate-500 text-sm'>Tapahtuma</small>
          <h1 className='text-lg'>{event.title}</h1>
        </div>

        <div className='xs:mb-8 lg:mb-0'>{children}</div>

        <MobileNavbar propertyId={event.refId} />
      </LayoutContentContainer>
    </div>
  );
}
