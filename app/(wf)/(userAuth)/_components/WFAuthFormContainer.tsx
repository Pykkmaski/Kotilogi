/**Renders a black rounded box, within which forms are rendered. */
export function WFAuthFormContainer({ children }) {
  return (
    <div className='rounded-lg bg-wf-background lg:p-12 xs:p-4 lg:w-[36rem] xs:w-full'>
      {children}
    </div>
  );
}
