import RootLayout from './layout'
import NewNote from '@/components/newnote'

function Home() {

  return (
    <main className="flex flex-col">
      <RootLayout>
          <div className="flex flex-col items-center justify-center w-full">
            <NewNote/>
          </div>
      </RootLayout>
    </main>
  )
}

export default Home