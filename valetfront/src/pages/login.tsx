'use client';

import RootLayout from '@/app/layout';
import LoginBox from '@/components/loginbox';
import { useEffect, useState } from 'react';

export default function Login() {

    const [isclient, setisclient] = useState(false);

    useEffect(() => {
        setisclient(true);
    }, []);

    return (
        <main className="flex flex-col">
            {   isclient &&
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