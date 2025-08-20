"use client"
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import HeaderMegaMenu from './header/page';
import FooterLinks from './footer/page';
import { CookiesProvider } from 'react-cookie';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <CookiesProvider>
        <HeaderMegaMenu />
        {children}
        <FooterLinks />
      </CookiesProvider>
    </MantineProvider>
  );
}