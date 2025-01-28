/**Renders a dark gray container with rounded corners. */
export function Container({ children }: React.PropsWithChildren) {
  return <div className='rounded-lg bg-wf-secondary p-10'>{children}</div>;
}
