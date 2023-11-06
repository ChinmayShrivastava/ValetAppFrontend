'use client';

import RootLayout from '@/app/layout';
import LoginBox from '@/components/loginbox';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { logoutAPI } from '@/functions/auth';
import { log } from 'console';

export default function Login() {

    const [isclient, setisclient] = useState(false);
    const router = useRouter();
    const logout = router.query.logout;

    useEffect(() => {
        setisclient(true);
        if (logout === '1') {
            logoutAPI().then((res) => {
                if (res) {
                    window.location.href = '/login';
                }
            }
        );
        }
    }, [logout]);

    return (
        <main className="flex flex-col">
            { isclient &&
                <RootLayout>
                <div>
                    <section className="bg-[#FFF8ED]">
                        <LoginBox />
                    </section>
                </div>
            </RootLayout>}
        </main>
    )
}