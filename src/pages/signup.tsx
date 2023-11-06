'use client';

import RootLayout from '@/app/layout';
import SignupBox from '@/components/signupbox';
import { useEffect, useState } from 'react';
import { logoutAPI } from '@/functions/auth';
import { log } from 'console';

export default function Signup() {

    const [isclient, setisclient] = useState(false);

    useEffect(() => {
        setisclient(true);
    }, []);

    return (
        <main className="flex flex-col">
            { isclient &&
                <RootLayout>
                <div>
                    <section className="bg-[#FFF8ED]">
                        <SignupBox />
                    </section>
                </div>
            </RootLayout>}
        </main>
    )
}