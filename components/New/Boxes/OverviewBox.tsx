import { ContentBox } from './ContentBox';
import { MainHeading } from '../Typography/Headings';
import { EditLink } from '../Links/EditLink';
import { SpaceBetween, Spacer } from '../Spacers';
import { Paragraph } from '../Typography/Paragraph';
import Image from 'next/image';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import Link from 'next/link';
import { HideOnMobile } from '../Util/HideOnMobile';

type OverviewBoxProps = {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  editUrl?: string;
  editContentText?: string;
  editIcon?: React.ReactNode;
};

export function OverviewBox({
  title,
  description,
  imageUrl,
  editUrl,
  editIcon,
  editContentText = 'Muokkaa Tietoja',
}: OverviewBoxProps) {
  return (
    <ContentBox>
      <Spacer direction='row'>
        <div className='relative w-[30%] aspect-square rounded-lg overflow-hidden border border-slate-200'>
          <Image
            src={imageUrl}
            fill={true}
            alt=''
            objectFit='cover'
          />
        </div>

        <Spacer direction='col'>
          <SpaceBetween
            firstElement={<MainHeading>{title}</MainHeading>}
            secondElement={
              editUrl ? (
                <>
                  <Link
                    href={editUrl}
                    title={editContentText}>
                    <IconButton color='primary'>{editIcon}</IconButton>
                  </Link>
                </>
              ) : null
            }
          />

          {description}
        </Spacer>
      </Spacer>
    </ContentBox>
  );
}
