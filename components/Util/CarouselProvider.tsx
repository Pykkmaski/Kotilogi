'use client';

import React, { ReactElement, ReactNode, useCallback, useLayoutEffect, useMemo } from 'react';
import { useState } from 'react';
import { PassProps } from './PassProps';
import { RenderOnCondition } from './RenderOnCondition';
import { createContextWithHook } from 'kotilogi-app/utils/createContextWithHook';

const [CarouselProviderContext, useCarouselProviderContext] = createContextWithHook<{
  slots: string[];
  stepForward: () => void;
  stepBackward: () => void;
  showSlot: (slotName: string) => void;
  currentSlot: string;
  onChange?: (currentSlot: string) => void;
}>('CarouselProviderContext');

type CarouselProviderProps = React.PropsWithChildren & {
  defaultSlot?: string;
  onChange?: (currentSlot: string) => void;
};
/**Provides logic for creating carousels containing slots, which can be traversed sequentially, or by jumping to specific slots by key. */
export function CarouselProvider({ children, defaultSlot, onChange }: CarouselProviderProps) {
  const childArray = useMemo(
    () => React.Children.toArray(children) as React.ReactElement[],
    [children]
  );

  //Does a deep loop of the passed children, to find all the ones defining a slot.
  const getSlotChildren = (children: React.ReactElement[]) => {
    const slotChildren = [];

    const findSlotChildren = (children: React.ReactElement[]) => {
      for (const child of children) {
        if (child.props?.slotName) {
          slotChildren.push(child);
        } else if (child.props?.children) {
          findSlotChildren(React.Children.toArray(child.props.children) as React.ReactElement[]);
        }
      }
    };

    findSlotChildren(children);
    return slotChildren;
  };

  const [initialSlot, setInitialSlot] = useState(defaultSlot);

  const [currentSlot, setCurrentSlot] = useState<string>(() => {
    const slotChildren = getSlotChildren(childArray);
    if (slotChildren.length == 0) return '';

    const childWithDefaultSlotName = defaultSlot
      ? slotChildren.find(child => child.props.slotName === defaultSlot)
      : null;
    console.log('Initial slot: ', initialSlot);
    return initialSlot || slots.at(0);
  });

  const [slots] = useState<string[]>(() => {
    const slotChildren = childArray.filter(
      (child: React.ReactElement) => child.props?.slotName
    ) as React.ReactElement[];
    return slotChildren.map(child => child.props.slotName);
  });

  const stepForward = useCallback(() => {
    const currentSlotIndex = slots.findIndex(slot => {
      console.log(slot, currentSlot);
      return slot == currentSlot;
    });

    if (currentSlotIndex === -1) return;
    const nextSlotName = slots.at(currentSlotIndex + 1);
    showSlot(nextSlotName || currentSlot);
  }, [slots, currentSlot, setCurrentSlot]);

  const stepBackward = useCallback(() => {
    const currentSlotIndex = slots.findIndex(slot => slot == currentSlot);
    if (currentSlotIndex === -1) return;

    console.log('current slot index: ', currentSlotIndex);
    const previousSlotName = slots.at(currentSlotIndex - 1);
    console.log(previousSlotName);
    showSlot(previousSlotName || currentSlot);
  }, [slots, currentSlot, setCurrentSlot]);

  const showSlot = (slotName: string) => {
    setCurrentSlot(slotName);
    setInitialSlot(slotName);
    onChange(slotName);
  };

  return (
    <CarouselProviderContext.Provider
      value={{
        slots,
        stepForward,
        stepBackward,
        showSlot,
        currentSlot,
      }}>
      {children}
    </CarouselProviderContext.Provider>
  );
}

type SlotProps = React.PropsWithChildren & {
  slotName: string;
};

/**Adds its children into the slots-state of the provider, and renders them. */
CarouselProvider.Slot = function ({ children, slotName }: SlotProps) {
  const { currentSlot } = useCarouselProviderContext();
  return currentSlot == slotName ? children : null;
};

type SelectSlotTriggerProps = React.PropsWithChildren & {
  slotToSelect: string;
};

CarouselProvider.SelectSlotTrigger = function ({
  children,
  slotToSelect,
  ...props
}: SelectSlotTriggerProps) {
  const { showSlot, currentSlot } = useCarouselProviderContext();

  return (
    <PassProps
      {...props}
      className='cursor-pointer'
      isSelected={slotToSelect == currentSlot}
      onClick={() => {
        showSlot(slotToSelect);
      }}>
      {children}
    </PassProps>
  );
};

CarouselProvider.NextTrigger = function ({ children }) {
  const { stepForward, currentSlot, slots } = useCarouselProviderContext();
  return (
    <PassProps
      onClick={() => stepForward()}
      disabled={currentSlot == slots.at(-1)}>
      {children}
    </PassProps>
  );
};

CarouselProvider.PreviousTrigger = function ({ children }) {
  const { stepBackward, currentSlot, slots } = useCarouselProviderContext();
  return (
    <PassProps
      onClick={stepBackward}
      disabled={currentSlot == slots.at(0)}>
      {children}
    </PassProps>
  );
};

CarouselProvider.HideOnSlot = function ({ children, slotToHideOn }) {
  const { currentSlot } = useCarouselProviderContext();
  return <RenderOnCondition condition={currentSlot !== slotToHideOn}>{children}</RenderOnCondition>;
};

CarouselProvider.Slots = function ({ renderFn }) {
  const { slots } = useCarouselProviderContext();
  return (
    <>
      {slots.map((slot, i) => (
        <PassProps key={`slot-${i}`}>{renderFn(slot)}</PassProps>
      ))}
    </>
  );
};

CarouselProvider.SlotNumbers = function () {
  const { slots, currentSlot } = useCarouselProviderContext();
  const indexOfCurrentSlot = slots.findIndex(slot => slot == currentSlot);
  return (
    <>
      {indexOfCurrentSlot + 1}/{slots.length}
    </>
  );
};
