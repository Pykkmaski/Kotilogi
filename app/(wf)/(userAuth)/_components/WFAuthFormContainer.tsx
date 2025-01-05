/**Renders a black rounded box, within which forms are rendered. */
export function WFAuthFormContainer({ children }) {
  return <div className='rounded-lg bg-wf-background p-12 w-[36rem]'>{children}</div>;
}
