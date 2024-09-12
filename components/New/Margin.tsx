/**Adds a pre-determined horizontal margin of mx-32, or mx-0 on mobile devices, to its children. */
export function Margin({ children }) {
  return <div className='lg:mx-96 xs:mx-0 flex-1 flex'>{children}</div>;
}
