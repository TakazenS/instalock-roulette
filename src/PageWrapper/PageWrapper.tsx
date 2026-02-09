import type { PropsWithChildren } from 'react';

interface Props {
  isMobile: boolean;
}

export default function PageWrapper(props: PropsWithChildren<Props>) {
  const { isMobile, children } = props;

  return (
    <main>
      {children}
    </main>
  );
}