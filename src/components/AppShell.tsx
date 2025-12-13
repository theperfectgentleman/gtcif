'use client';

import React, { useEffect, useState } from 'react';
import SimpleLoader from './SimpleLoader';

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {showLoader ? (
        <SimpleLoader />
      ) : (
        children
      )}
    </>
  );
}
