'use client';

import { FooterNav } from '@/components/Feature/FooterNav';
import Link from 'next/link';
import React from 'react';

export const MobileNavLink = ({ children, ...props }: React.ComponentProps<typeof Link>) => {
  return <FooterNav.Link {...props}>{children}</FooterNav.Link>;
};
