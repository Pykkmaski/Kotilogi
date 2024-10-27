export function SkeletonCard({ children }) {
  return (
    <div className='flex items-center justify-center rounded-md overflow-hidden xs:w-[200px] md:h-[300px] relative snap-center shrink-0 h-[350px] border-2 border-dashed border-slate-300'>
      {children}
    </div>
  );
}
