import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React from 'react';
import { createContext, useRef, useState } from 'react';

const MultiStepModalContext = createContext<{
  changeStep: (direction: 1 | -1) => void;
  steps: React.MutableRefObject<Set<typeof MultiStepModal.Step>>;
} | null>(null);

export function MultiStepModal({ children }) {
  const [step, setStep] = useState(0);
  const steps = useRef<Set<typeof MultiStepModal.Step>>(new Set());

  const changeStep = (direction: 1 | -1) => setStep(prev => prev + direction);

  return (
    <MultiStepModalContext.Provider value={{ changeStep, steps }}>
      {children}
    </MultiStepModalContext.Provider>
  );
}

MultiStepModal.Step = function ({ children }) {
  const { steps } = useMultiStepModalContext();
  return children;
};

const useMultiStepModalContext = createUseContextHook<typeof MultiStepModalContext>(
  'MultiStepModalContext',
  MultiStepModalContext
);
