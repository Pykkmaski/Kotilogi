/**Renders flex container for inputs and their labels. */
export function WFAuthInputGroup({ children }) {
  return <div className='flex flex-col gap-2 w-full'>{children}</div>;
}

WFAuthInputGroup.Label = function ({ children }) {
  return <label className='text-white'>{children}</label>;
};
