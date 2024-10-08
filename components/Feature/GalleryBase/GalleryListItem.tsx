import { ListItem, ListItemProps } from '@/components/Feature/ListItem/ListItem';
import Link from 'next/link';

type GalleryListItemProps<T extends Kotidok.ItemType> = ListItemProps<T> & {
  title: string;
  description?: string;
  footerText: string;
  href: string;
  faIcon: string;

  /**Content to display after the main header content. */
  secondaryHeaderContent?: React.ReactNode;

  /**Content to display inside the controls-section. */
  controlsContent?: React.ReactNode;
};

/**Renders a pre-structured ListItem for Galleries. */
export function GalleryListItem<T extends Kotidok.ItemType>({
  title,
  description,
  footerText,
  faIcon,
  secondaryHeaderContent,
  controlsContent,
  href,
  ...props
}: GalleryListItemProps<T>) {
  return (
    <ListItem {...props}>
      <ListItem.Body>
        <Link
          href={href}
          className='flex-1 w-full cursor-pointer hover:no-underline'>
          <ListItem.Header>
            <div className='flex items-center gap-2'>
              <i className={`${faIcon} text-slate-500`} />
              <h1 className='text-lg text-black'>{title}</h1>
              {secondaryHeaderContent}
            </div>
          </ListItem.Header>

          <ListItem.Description>{description || 'Ei kuvausta.'}</ListItem.Description>

          <ListItem.Footer>
            <h2>{footerText}</h2>
          </ListItem.Footer>
        </Link>
      </ListItem.Body>

      <ListItem.Controls>{controlsContent}</ListItem.Controls>
    </ListItem>
  );
}
