import React from 'react';

type DisableIfFieldMissingProps<T> = React.PropsWithChildren & {
  data: T;
  fieldToCheck: string;
};

export function DisableIfFieldMissing<T extends {}>({
  children,
  data,
  fieldToCheck,
}: DisableIfFieldMissingProps<T>) {
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      disabled: !(fieldToCheck in data),
    })
  );
}
