'use client'

import { useRouter } from 'next/router';
import RootLayout from '@/app/layout';
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import NotesContainer from '@/components/notescontainer';

export default function Document() {

  const [isclient, setisclient] = useState(false);
  const router = useRouter();
  // url is /documents/[documentid]?name=[documentname]&id=[documentid]
  const documentname = router.query.name;
  const documentid = router.query.id;

  useEffect(() => {
    setisclient(true);
  }, []);

  return (
    <main className="flex flex-col">
      { isclient &&
      <RootLayout>
        <Sidebar>
          <NotesContainer documentid={documentid} documentname={documentname} />
          {/* {documentid} */}
        </Sidebar>
      </RootLayout>}
    </main>
  )
};