import Link from 'next/link';

export default function ActivatedPage({ searchParams }) {
  return (
    <main className='flex flex-col items-center justify-center w-full h-full'>
      <h1 className='text-2xl'>Tilin aktivointi onnistui!</h1>
      <p>Käyttäjätilisi {searchParams.email} on nyt käytössä. Ole hyvä ja </p>
    </main>
  );
}
