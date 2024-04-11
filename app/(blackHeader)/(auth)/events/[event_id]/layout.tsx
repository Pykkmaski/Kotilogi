import { BackgroundFiller } from '@/components/BackgroundFIller';
import { FooterNav } from '@/components/FooterNav';
import { Padding } from '@/components/Util/Padding';
import { Group } from 'kotilogi-app/components/Group';
import { Header } from 'kotilogi-app/components/Header/Header';
import { SecondaryHeading } from 'kotilogi-app/components/Heading';
import IconLink from 'kotilogi-app/components/IconLink/IconLink';
import { Layout, LayoutContentContainer, LayoutNavBarContainer, NavDivider } from 'kotilogi-app/components/Layout';
import { NavBar } from 'kotilogi-app/components/NavBar/NavBar';
import { SplitScreen } from 'kotilogi-app/components/SplitScreen/SplitScreen';
import db from 'kotilogi-app/dbconfig';
import Link from 'next/link';

export default async function EventLayout({ children, params }) {
  const event = await db('propertyEvents').where({ id: params.event_id }).first();
  if (!event) throw new Error('Tapahtuman lataus epäonnistui!');

  const [property] = await db('properties').where({ id: event.refId });
  if (property.status == 'deactivated') {
    throw new Error('Käytöstä poistetun talon tietoja ei voi muokata!');
  }

  return (
    <div className='flex gap-4 w-full flex-1'>
      <LayoutNavBarContainer>
        <Header>
          <Group direction='col' gap={0}>
            <SecondaryHeading>
              <span className='text-white'>Tapahtuma</span>
            </SecondaryHeading>
            <span className='text-white text-xl max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap'>{event.title}</span>
          </Group>
        </Header>

        <NavBar>
          <div className='text-white'>
            <IconLink href={`info`} imageSrc='/icons/info.png' icon='fa-info-circle'>
              Tiedot
            </IconLink>
            <IconLink href={'images'} imageSrc='/icons/image.png' icon='fa-image'>
              Kuvat
            </IconLink>
            <IconLink href={'files'} imageSrc='/icons/copy.png' icon='fa-copy'>
              Tiedostot
            </IconLink>
            <NavDivider />
            <IconLink href={`/properties/${event.refId}/events`} imageSrc='/icons/history.png' icon='fa-history'>
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

        <FooterNav>
          <Link href='info'>
            <i className='fa fa-info-circle' />
          </Link>

          <Link href='images'>
            <i className='fa fa-image' />
          </Link>

          <Link href='files'>
            <i className='fa fa-copy' />
          </Link>

          <Link href={`/properties/${event.refId}/events`}>
            <i className='fa fa-history' />
          </Link>
        </FooterNav>
      </LayoutContentContainer>
    </div>
  );
}
