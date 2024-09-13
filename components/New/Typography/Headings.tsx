/** Renders text within an h1 with the tailwind text-xl property.*/
export function MainHeading({ children }: React.PropsWithChildren) {
  return <h1 className='lg:text-3xl xs:text-lg text-slate-500 font-semibold'>{children}</h1>;
}

/**Renders text within an h2 with the tailwind text-lg property. */
export function SecondaryHeading({ children }: React.PropsWithChildren) {
  return <h2 className='lg:text-2xl text-slate-500 font-semibold'>{children}</h2>;
}

export function TertiaryHeading({ children }: React.PropsWithChildren) {
  return <h3 className='lg:text-xl text-slate-500'>{children}</h3>;
}
