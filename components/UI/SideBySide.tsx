import React from 'react';

export function SideBySide({ children }) {
  if (React.Children.count(children) !== 2) {
    throw new Error('A SideBySide-component must have exactly two(2) children!');
  }

  const [first, second] = React.Children.toArray(children);

  return (
    <div className='flex w-full'>
      <div className='w-full'>{first}</div>

      <div className='w-full'>{second}</div>
    </div>
  );
}
