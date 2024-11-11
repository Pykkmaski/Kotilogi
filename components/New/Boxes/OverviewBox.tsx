'use client';

import { ContentBox } from './ContentBox';
import { MainHeading } from '../Typography/Headings';
import { Spacer } from '../../UI/Spacer';
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
import { ObjectDataType } from 'kotilogi-app/dataAccess/types';
import { noScrollBar } from 'kotilogi-app/utils/noScrollBar';
import { ToggleProvider } from '@/components/Util/ToggleProvider';
import { VPDialog } from '@/components/UI/VPDialog';
import { Button } from '../Button';
import { VPCloseOnActionButton } from '@/components/UI/VPCloseOnActionButton';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { useMemo } from 'react';

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
        <div className='w-full'>
          <Spacer
            dir='col'
            gap={'medium'}>
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

                <RenderOnCondition condition={deleteUrl}>
                  <Link href={deleteUrl}>
                    <IconButton>
                      <Delete color='warning' />
                    </IconButton>
                  </Link>
                </RenderOnCondition>

                <RenderOnCondition condition={deleteAction != undefined}>
                  <ToggleProvider>
                    <ToggleProvider.MUITarget>
                      <VPDialog>
                        <DialogTitle>Poista kohde</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Haluatko varmasti poistaa tämän kohteen?
                          </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                          <ToggleProvider.Trigger>
                            <Button
                              variant='text'
                              color='secondary'>
                              Peruuta
                            </Button>
                          </ToggleProvider.Trigger>

                          <VPCloseOnActionButton
                            action={async () => await deleteAction()}
                            startIcon={<Delete />}
                            color='warning'>
                            Poista
                          </VPCloseOnActionButton>
                        </DialogActions>
                      </VPDialog>
                    </ToggleProvider.MUITarget>
                    <ToggleProvider.Trigger>
                      <IconButton
                        color='warning'
                        size='small'>
                        <Delete />
                      </IconButton>
                    </ToggleProvider.Trigger>
                  </ToggleProvider>
                </RenderOnCondition>
              </div>
            </div>

            <p>{description}</p>

            <div className='mt-auto w-full'>
              <Spacer
                justify='end'
                width='full'>
                <RenderOnCondition condition={selectableItem != undefined}>
                  <input type='checkbox'></input>
                </RenderOnCondition>
              </Spacer>
            </div>
          </Spacer>
        </div>
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
  ...props
}: OverviewImageProps) => {
  const classes = useMemo(
    () => [
      'cursor-pointer relative aspect-square flex-shrink-0 rounded-full overflow-hidden border border-slate-200 xs:w-[100px] xs:h-[100px] md:w-[200px] md:h-[200px]',
      `md:w-[${mediumScreenWidth}px] md:h-[${mediumScreenWidth}px] xs:w-[${smallScreenWidth}px] xs:h-[${smallScreenWidth}px]`,
    ],
    [mediumScreenWidth, smallScreenWidth]
  );

  return (
    <div
      {...props}
      className={classes[0]}
      style={noScrollBar}
      title='Valitse pääkuva'>
      <Image
        src={src}
        fill={true}
        alt=''
        objectFit='cover'
      />
    </div>
  );
};
