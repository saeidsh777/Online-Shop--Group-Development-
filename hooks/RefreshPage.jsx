'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const RefreshButton = () => {
    const Params = useSearchParams();

    if (Params.has('tryRefresh'))
        return (
            <h2 className="font-bold">
                Sorry looks like refresh does not help!
                {'=> '}
                <Link
                    href="/dashboard"
                    className="font-bold underline underline-offset-auto hover:no-underline text-blue-600"
                >
                    Go Home
                </Link>
            </h2>
        );
    return (
        <Link
            href={{
                query: 'tryRefresh',
            }}
            className="font-bold underline underline-offset-auto hover:no-underline  text-blue-600"
        >
            Refresh
        </Link>
    );
};

const RefreshPage = () => {
    const [renderCount, setCount] = useState(1);
    const Router = useRouter();

    useEffect(() => {
        if (renderCount !== 1) return;
        setCount(prv => prv + 1);
        Router.refresh();
    }, [renderCount, Router]);

    return (
        <div>
            <h3 className="text-center font-medium text-[120%] mb-5">
                Oops something went wrong!{' '}
            </h3>
            <Suspense fallback={'loading...'}>
                <RefreshButton />
            </Suspense>
        </div>
    );
};
export default RefreshPage;
