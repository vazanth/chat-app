import { FC } from 'react';

export interface I_ROUTE {
  exact?: boolean,
  path?: string,
  from?:  string,
  to?: string,
  role?: string,
  content?: FC
}

export interface I_PROVIDER_PROPS {children: React.ReactNode}