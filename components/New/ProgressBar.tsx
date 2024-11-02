import { CSSProperties, useMemo } from 'react';
import bstyle from './ProgressBar.module.css';

type ProgressBarProps = React.ComponentProps<'div'> & {
  maxProgress: number;
  currentProgress: number;
};

export function ProgressBar({ className, maxProgress, currentProgress }: ProgressBarProps) {
  const progress = useMemo(
    () => (currentProgress > 0 ? Math.round((currentProgress / maxProgress) * 100) : 0),
    [currentProgress, maxProgress]
  );

  const style: CSSProperties = {
    width: `${progress}%`,
  };
  return (
    <div className={className}>
      <div
        className={`bg-secondary rounded-md h-full ${bstyle.progressBar}`}
        style={style}>
        {progress}/{100}
      </div>
    </div>
  );
}
