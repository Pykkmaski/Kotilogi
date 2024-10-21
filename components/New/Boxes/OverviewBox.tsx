'use client';

import { ContentBox } from './ContentBox';
import { MainHeading } from '../Typography/Headings';
import { Spacer } from '../Spacer';
import Image from 'next/image';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import Link from 'next/link';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { ObjectDataType } from 'kotilogi-app/dataAccess/types';
import { noScrollBar } from 'kotilogi-app/utils/noScrollBar';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { VPDialog } from '@/components/UI/VPDialog';
import { Button } from '../Button';
import { VPCloseOnActionButton } from '@/components/UI/VPCloseOnActionButton';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

type OverviewBoxProps = {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  editUrl?: string;
  showUrl?: string;
  editContentText?: string;
  editIcon?: React.ReactNode;
  selectableItem?: ObjectDataType;
  deleteUrl?: string;
  deleteAction?: () => Promise<void>;
};

export function OverviewBox({
  title,
  deleteAction,
  description,
  imageUrl,
  editUrl,
  showUrl,
  deleteUrl,
  editIcon,
  selectableItem,
  editContentText = 'Muokkaa Tietoja',
}: OverviewBoxProps) {
  return (
    <ContentBox>
      <div className='flex flex-row lg:gap-8 xs:gap-2 w-full'>
        <div className='xs:hidden md:block'>
          <OverviewImage src={imageUrl} />
        </div>

        <Spacer
          direction='col'
          width='full'
          gap={4}>
          <div className='flex w-full justify-between'>
            <RenderOnCondition
              condition={showUrl}
              fallback={<MainHeading>{title}</MainHeading>}>
              <Link href={showUrl}>
                <MainHeading>{title}</MainHeading>
              </Link>
            </RenderOnCondition>

            <div className='justify-end w-auto'>
              <RenderOnCondition condition={editUrl}>
                <Link
                  href={editUrl}
                  title={editContentText || 'Näytä'}>
                  <IconButton
                    color='secondary'
                    size='small'>
                    {editIcon || <Visibility />}
                  </IconButton>
                </Link>
              </RenderOnCondition>

              <RenderOnCondition condition={deleteAction != undefined}>
                <VisibilityProvider>
                  <VisibilityProvider.Target>
                    <VPDialog>
                      <DialogTitle>Poista kohde</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Haluatko varmasti poistaa tämän kohteen?
                        </DialogContentText>
                      </DialogContent>

                      <DialogActions>
                        <VisibilityProvider.Trigger>
                          <Button
                            variant='text'
                            color='secondary'>
                            Peruuta
                          </Button>
                        </VisibilityProvider.Trigger>

                        <VPCloseOnActionButton
                          action={async () => await deleteAction()}
                          startIcon={<Delete />}
                          color='warning'>
                          Poista
                        </VPCloseOnActionButton>
                      </DialogActions>
                    </VPDialog>
                  </VisibilityProvider.Target>
                  <VisibilityProvider.Trigger>
                    <IconButton
                      color='warning'
                      size='small'>
                      <Delete />
                    </IconButton>
                  </VisibilityProvider.Trigger>
                </VisibilityProvider>
              </RenderOnCondition>
            </div>
          </div>

          <p>{description}</p>

          <div className='mt-auto'>
            <Spacer
              justifyItems='end'
              width='full'>
              <RenderOnCondition condition={selectableItem != undefined}>
                <input type='checkbox'></input>
              </RenderOnCondition>
            </Spacer>
          </div>
        </Spacer>
      </div>
    </ContentBox>
  );
}

type OverviewImageProps = {
  src: string;
  /**The width of the image in pixels on medium-size devices. Defaults to 150.*/
  mediumScreenWidth?: number;

  /**A width of the image in pixels on small-size devices. Defaults to 100.*/
  smallScreenWidth?: number;
};

export const OverviewImage = ({
  src,
  mediumScreenWidth = 150,
  smallScreenWidth = 100,
}: OverviewImageProps) => {
  const classes = [
    'relative aspect-square flex-shrink-0 rounded-full overflow-hidden border border-slate-200 xs:w-[100px] xs:h-[100px] md:w-[200px] md:h-[200px]',
    `md:w-[${mediumScreenWidth}px] md:h-[${mediumScreenWidth}px] xs:w-[${smallScreenWidth}px] xs:h-[${smallScreenWidth}px]`,
  ];

  return (
    <div
      className={classes[0]}
      style={noScrollBar}>
      <Image
        src={src}
        fill={true}
        alt=''
        objectFit='cover'
      />
    </div>
  );
};
