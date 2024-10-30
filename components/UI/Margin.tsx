import { PassProps } from '../Util/PassProps';

/**Adds a pre-determined horizontal margin of mx-32, or mx-0 on mobile devices, to its children. */
export function Margin({ children, ...props }) {
  return (
    <div className='lg:mx-64 sm:mx-10 md:mx-16 xs:mx-0 flex-1 flex'>
      <PassProps {...props}>{children}</PassProps>
    </div>
  );
}