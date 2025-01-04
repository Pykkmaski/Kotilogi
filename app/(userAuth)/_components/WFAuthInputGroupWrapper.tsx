/**Renders a flex-container to wrap WFAuthInputGroups so they can be displayed in the specific spacing. */
export function WFAuthInputGroupWrapper({ children }) {
  return <div className='flex flex-col gap-4'>{children}</div>;
}
