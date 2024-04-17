const Square = ({ icon }) => {
  return (
    <div className='flex items-center justify-center bg-black rounded-lg aspect-square text-4xl'>
      <i className={`${icon} text-white`} />
    </div>
  );
};
export default function PropertyPage() {
  return (
    <main className='grid grid-cols-2 gap-4 items-center'>
      <Square icon='fa fa-info-circle' />
      <Square icon='fa fa-history' />
      <Square icon='fa fa-bolt' />
      <Square icon='fa fa-image' />
      <Square icon='fa fa-copy' />
    </main>
  );
}
