'use client';

export default function Error({ error, reset }) {
  return (
    <main className='flex flex-col flex-1 mx-32'>
      <div className='mt-32 flex flex-col text-xl'>
        <h1 className='text-4xl'>Hups! Kohtasimme virheen!</h1>
        <span className='text-slate-500 mt-4'>
          Virheviesti: <span className='text-red-600 font-semibold'>{error.message}</span>
        </span>
      </div>

      <p className='mt-8'>Kokeile päivittää sivu.</p>
      {reset}
    </main>
  );
}
