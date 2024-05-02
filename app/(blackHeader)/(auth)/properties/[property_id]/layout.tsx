import db from 'kotilogi-app/dbconfig';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { NavBar } from '@/components/UI/NavBar';
import IconLink from '@/components/UI/IconLink';
import { Header } from '@/components/UI/Header/Header';
import { LayoutContentContainer, LayoutNavBarContainer, NavDivider } from '@/components/UI/Layout';
import { Group } from '@/components/UI/Group';
import { SecondaryHeading } from '@/components/UI/Heading';
import { redirect } from 'next/navigation';
import { MobileNavBar } from './_components/MobileNavBar';
import { UserType } from 'kotilogi-app/types/UserType';

export default async function PropertyDetailsLayout({ children, params }) {
  const property = await db('properties').where({ id: params.property_id }).first();
  if (!property) throw new Error('Failed to load property!');

  const session = (await getServerSession(options as any)) as {
    user: UserType;
  };

  if (!session) throw new Error('Failed to fetch user session!');

  if (session.user.email != property.refId) throw new Error('property_unauthorized');

  if (property.status == 'deactivated') {
    throw new Error('Talo ei ole käytössä!');
  }

  const currentDate = Date.now();
  const bills = await db('bills')
    .where({ targetId: property.id })
    .andWhere('due', '<=', currentDate);

  if (bills.length) {
    redirect('/dashboard/cart');
  }

  return (
    <div className='flex flex-row gap-2 w-full flex-1 lg:bg-gray-600 xs:bg-black'>
      <LayoutNavBarContainer>
        <Header>
          <Group direction='col'>
            <SecondaryHeading>
              <span className='text-white'>Talo</span>
            </SecondaryHeading>
            <span className='text-white text-xl'>{property.title}</span>
          </Group>
        </Header>

        <div className='text-white'>
          <NavBar>
            <IconLink
              icon='fa-info-circle'
              imageSrc={'/icons/info.png'}
              href='info?section=general'>
              Tiedot
            </IconLink>
            <IconLink
              icon='fa-history'
              imageSrc={'/icons/history.png'}
              href='events'>
              Tapahtumat
            </IconLink>
            <IconLink
              icon='fa-bolt'
              imageSrc={'/icons/bolt.png'}
              href='usage?type=all'>
              Kulutustiedot
            </IconLink>
            <IconLink
              icon='fa-image'
              imageSrc={'/icons/image.png'}
              href='images'>
              Kuvat
            </IconLink>
            <IconLink
              icon='fa-copy'
              imageSrc={'/icons/copy.png'}
              href='files'>
              Tiedostot
            </IconLink>
            <NavDivider />

            <IconLink
              icon='fa-home'
              imageSrc={'/icons/house.png'}
              href={`/dashboard/properties/`}>
              Takaisin Taloihin
            </IconLink>
          </NavBar>
        </div>
      </LayoutNavBarContainer>

      <LayoutContentContainer>
        <div className='xs:block lg:hidden flex flex-col mb-10'>
          <small className='text-slate-500 text-sm'>Talo</small>
          <h1 className='text-lg'>{property.title}</h1>
        </div>

        <div className='xs:mb-8 lg:mb-0'>{children}</div>
        <MobileNavBar />
      </LayoutContentContainer>
    </div>
  );
}
