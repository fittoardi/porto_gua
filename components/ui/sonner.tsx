'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-2 group-[.toaster]:border-black group-[.toaster]:shadow-brutal',
          description: 'group-[.toast]:text-black/60',
          actionButton:
            'group-[.toast]:bg-brand-yellow group-[.toast]:text-black group-[.toast]:border-2 group-[.toast]:border-black',
          cancelButton:
            'group-[.toast]:bg-white group-[.toast]:text-black/60',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
