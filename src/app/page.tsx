'use client'

import RootLayout from './layout'
import NewNote from '@/components/newnote'
import Sidebar from '@/components/sidebar'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';
import { checkAuthAPI } from '@/functions/auth';
import { useEffect } from 'react';
import { login } from '@/redux/features/auth-slice';

function Home() {

    const dispatch = useDispatch<AppDispatch>();
    const auth = useAppSelector((state) => state.authReducer.value);

    useEffect(() => {

        // if auth=1 in the url, then we are coming from the login page
        // and we need to check if the user is authenticated

        const urlParams = new URLSearchParams(window.location.search);
        const auth_ = urlParams.get('auth');

        if (auth_ === '1') {
          dispatch(login());
        }
        else {
          checkAuthAPI().then((res) => {
              if (res) {
                  dispatch(login());
              }
              else {
                  window.location.href = '/login';
              }
          });
        }
    }, [dispatch]);

    return (
      <main className="flex flex-col">
        { auth &&
          <RootLayout>
            <Sidebar>
              <div className="flex flex-col items-center justify-center w-full h-screen">
                <div className="w-3/4 drop-shadow-lg">
                  <NewNote />
                </div>
              </div>
            </Sidebar>
        </RootLayout>}
      </main>
    )
  }

export default Home;