'use client'

import RootLayout from './layout'
import NewNote from '@/components/newnote'
import Sidebar from '@/components/sidebar'

function Home() {

  return (
    <main className="flex flex-col">
      <RootLayout>
          <Sidebar>
            <div className="flex flex-col items-center justify-center w-full">
                <NewNote />
            </div>
          </Sidebar>
      </RootLayout>
    </main>
  )
}

export default Home;