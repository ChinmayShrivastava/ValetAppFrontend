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
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-4/5 drop-shadow-lg">
              <NotesContainer documentid={documentid} documentname={documentname} />
            </div>
          </div>
          {/* {documentid} */}
        </Sidebar>
      </RootLayout>}
    </main>
  )
};