import { Spacer } from '../Spacer';

/**Renders its children within a rounded box, with padding and a shadow. */
export function ContentBox({ children }: React.PropsWithChildren) {
  return (
    <div className='rounded-lg shadow-sm lg:p-4 xs:p-2 bg-white flex-grow flex flex-col'>
      <Spacer direction='col'>{children}</Spacer>
    </div>
  );
}
