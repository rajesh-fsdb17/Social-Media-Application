import React from 'react';
import Navbar from './component/Navbar';
import { Container, Theme } from '@radix-ui/themes';
import {ThemeProvider} from "@/components/theme-provider"

const Layout = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Navbar />
    <Container>
      <main>{children}</main>
    </Container>
    </ThemeProvider>
    
  );
};

export default Layout;
// to conditionally render layout