/**Adds a pre-determined horizontal margin of mx-32 to its children. */
export function Margin({ children }) {
  return <div className='lg:mx-96 xs:mx-0 flex-1 flex'>{children}</div>;
}
