import { Spacer } from '../../UI/Spacer';

/**Renders its children within a rounded box, with padding and a shadow. */
export function ContentBox({
  children,
  grow = true,
}: React.PropsWithChildren & { grow?: boolean }) {
  const classes = [
    'rounded-lg shadow-sm lg:p-4 xs:p-2 bg-white flex-grow flex flex-col',
    grow ? 'flex-grow' : 'flex-grow-0',
  ];
  return (
    <div className={classes.join(' ')}>
      <Spacer dir='col'>{children}</Spacer>
    </div>
  );
}
