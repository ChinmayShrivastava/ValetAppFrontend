import RootLayout from './app/layout'; // Adjusted path. Update if needed.
import Sidebar from './components/sidebar'; // Adjusted path. Update if needed.
import Documentscontainer from './components/documentscontainer'; // Adjusted path. Update if needed.
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// Removed TypeScript-specific imports.

export default function Documents() {
  
  const [isclient, setisclient] = useState(false);
  const dispatch = useDispatch(); // If you're using Redux actions, you'd dispatch them using this.

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
                  <Documentscontainer />
                </div>
              </div>
            </Sidebar>
        </RootLayout>}
      </main>
  )
};
