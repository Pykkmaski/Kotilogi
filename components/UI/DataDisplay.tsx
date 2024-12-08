export const DataDisplay = ({ title, value }) => (
  <div className='flex items-center w-full justify-between border-b border-slate-200'>
    <h2 className='font-semibold'>{title}</h2>
    <span>{value}</span>
  </div>
);

export const DataContainer = ({ children }) => {
  return (
    <div
      className='flex flex-col gap-10 w-full h-full'
      id='overview-box-information-container'>
      {children}
    </div>
  );
};
