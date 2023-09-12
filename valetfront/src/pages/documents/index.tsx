'use client'

import RootLayout from '@/app/layout';
import Sidebar from '@/components/sidebar';
import Documentscontainer from '@/components/documentscontainer';
import { useEffect, useState } from 'react';

export default function Documents() {

  const [isclient, setisclient] = useState(false);

  useEffect(() => {
    setisclient(true);
  }, []);

  return (
    <main className="flex flex-col">
      { isclient &&
      <RootLayout>
        <Sidebar>
            <Documentscontainer />
        </Sidebar>
      </RootLayout>}
    </main>
  )
};