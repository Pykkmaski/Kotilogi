'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { Modal } from '../UI/Modal';

const CarouselProviderContext = createContext<{
  stepForward: () => void;
  stepBackward: () => void;
  showSlot: (slotName: string) => void;
  currentSlot: string;
}>(null);

type CarouselProviderProps = React.PropsWithChildren & {
  defaultSlot?: string;
};
/**Provides logic for creating carousels containing slots, which can be traversed sequentially, or by jumping to specific slots by key. */
export function CarouselProvider({ children, defaultSlot }: CarouselProviderProps) {
  const childArray = React.Children.toArray(children) as React.ReactElement[];

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

  const [slots] = useState<string[]>(() => {
    const slotChildren = childArray.filter(
      (child: React.ReactElement) => child.props?.slotName
    ) as React.ReactElement[];
    return slotChildren.map(child => child.props.slotName);
  });

  const stepForward = () => {
    const currentSlotIndex = slots.findIndex(slot => slot == currentSlot);
    if (currentSlotIndex === -1) return;
    const nextSlotName = slots.at(currentSlotIndex + 1);
    setCurrentSlot(nextSlotName || currentSlot);
  };

  const stepBackward = () => {
    const currentSlotIndex = slots.findIndex(slot => slot == currentSlot);
    if (currentSlotIndex === -1) return;
    const previousSlotName = slots.at(currentSlotIndex - 1);
    setCurrentSlot(previousSlotName || currentSlot);
  };

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
  return currentSlot === slotName ? children : null;
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
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child,
      ...props,
      onClick: () => showSlot(slotToSelect),
    })
  );
};

CarouselProvider.NextTrigger = function ({ children }) {
  const { stepForward } = useCarouselProviderContext();

  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      onClick: () => stepForward(),
    })
  );
};

CarouselProvider.PreviousTrigger = function ({ children }) {
  const { stepBackward } = useCarouselProviderContext();

  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      onClick: stepBackward,
    })
  );
};

CarouselProvider.HideOnSlot = function ({ children, slotToHideOn }) {
  const { currentSlot } = useCarouselProviderContext();
  return currentSlot !== slotToHideOn ? children : null;
};

const useCarouselProviderContext = createUseContextHook(
  'CarouselProviderContext',
  CarouselProviderContext
);
