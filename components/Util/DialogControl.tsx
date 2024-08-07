'use client';

import { DialogProps } from '@mui/material';
import React from 'react';
import { ReactElement, useState } from 'react';

type DialogControlProps = {
  trigger: ({ onClick }) => ReactElement;
  control: ({ show, handleClose }) => ReactElement;
};

export function DialogControl({ trigger, control }: DialogControlProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      {trigger({ onClick: () => setShow(true) })}
      {control({ show, handleClose })}
    </>
  );
}
