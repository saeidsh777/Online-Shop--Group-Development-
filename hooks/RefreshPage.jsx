'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

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
    return (
        <Suspense fallback={'loading...'}>
            <RefreshButton />
        </Suspense>
    );
};
export default RefreshPage;
