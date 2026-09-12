'use client';

import { Toaster } from '@/components/ui/sonner';
import CustomCursor from './custom-cursor';
import Footer from './footer';
import LoadingScreen from './loading-screen';
import Navbar from './navbar';
import SmoothScroll from './smooth-scroll';

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
      <Toaster position="bottom-right" />
    </>
  );
}
