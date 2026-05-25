'use client';

import type { ReactNode } from 'react';
import { TooltipProvider } from '~/shared/ui/kit';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};
