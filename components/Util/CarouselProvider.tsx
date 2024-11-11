'use client';

import React, { ReactNode, useCallback, useLayoutEffect, useMemo } from 'react';
import { useState } from 'react';
import { PassProps } from './PassProps';
import { RenderOnCondition } from './RenderOnCondition';
import { createContextWithHook } from 'kotilogi-app/utils/createContextWithHook';

const [CarouselProviderContext, useCarouselProviderContext] = createContextWithHook<{
  stepForward: () => void;
  stepBackward: () => void;
  showSlot: (slotName: string) => void;
  currentSlot: string;
}>('CarouselProviderContext');

type CarouselProviderProps = React.PropsWithChildren & {
  defaultSlot?: string;
};
/**Provides logic for creating carousels containing slots, which can be traversed sequentially, or by jumping to specific slots by key. */
export function CarouselProvider({ children, defaultSlot }: CarouselProviderProps) {
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

  const [currentSlot, setCurrentSlot] = useState<string>(() => {
    const slotChildren = getSlotChildren(childArray);

    if (slotChildren.length == 0) return '';

    const childWithDefaultSlotName = slotChildren.find(
      child => child.props.slotName === defaultSlot
    );

    return childWithDefaultSlotName
      ? childWithDefaultSlotName.props.slotName
      : slotChildren.at(0).props.slotName;
  });

  const [slots, setSlots] = useState<string[]>(() => {
    const slotChildren = childArray.filter(
      (child: React.ReactElement) => child.props?.slotName
    ) as React.ReactElement[];
    return slotChildren.map(child => child.props.slotName);
  });

  const stepForward = useCallback(() => {
    const currentSlotIndex = slots.findIndex(slot => slot == currentSlot);
    if (currentSlotIndex === -1) return;
    const nextSlotName = slots.at(currentSlotIndex + 1);
    setCurrentSlot(nextSlotName || currentSlot);
  }, [slots, setCurrentSlot]);

  const stepBackward = useCallback(() => {
    const currentSlotIndex = slots.findIndex(slot => slot == currentSlot);
    if (currentSlotIndex === -1) return;
    const previousSlotName = slots.at(currentSlotIndex - 1);
    setCurrentSlot(previousSlotName || currentSlot);
  }, [slots, setCurrentSlot]);

  const showSlot = (slotName: string) => {
    setCurrentSlot(slotName);
  };

  return (
    <CarouselProviderContext.Provider
      value={{
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
  return <RenderOnCondition condition={currentSlot === slotName}>{children}</RenderOnCondition>;
};

type SelectSlotTriggerProps = React.PropsWithChildren & {
  slotToSelect: string;
};

CarouselProvider.SelectSlotTrigger = function ({
  children,
  slotToSelect,
  ...props
}: SelectSlotTriggerProps) {
  const { showSlot } = useCarouselProviderContext();
  return (
    <PassProps
      {...props}
      onClick={() => showSlot(slotToSelect)}>
      {children}
    </PassProps>
  );
};

CarouselProvider.NextTrigger = function ({ children }) {
  const { stepForward } = useCarouselProviderContext();
  return <PassProps onClick={() => stepForward()}>{children}</PassProps>;
};

CarouselProvider.PreviousTrigger = function ({ children }) {
  const { stepBackward } = useCarouselProviderContext();
  return <PassProps onClick={stepBackward}>{children}</PassProps>;
};

CarouselProvider.HideOnSlot = function ({ children, slotToHideOn }) {
  const { currentSlot } = useCarouselProviderContext();
  return <RenderOnCondition condition={currentSlot !== slotToHideOn}>{children}</RenderOnCondition>;
};
