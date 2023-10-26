'use client'

import { useRouter } from 'next/router';
import RootLayout from '@/app/layout';
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import Chat from '@/components/chat';

export default function Document() {

  const [isclient, setisclient] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    setisclient(true);
  }, []);

  return (
    <>
    <main className="flex flex-col">
      { isclient &&
      <RootLayout>
        <Sidebar>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-4/5 drop-shadow-lg">
              <div className='h-screen p-6'>
                <Chat />
              </div>
            </div>
          </div>
        </Sidebar>
      </RootLayout>}
    </main>
    </>
  )
};