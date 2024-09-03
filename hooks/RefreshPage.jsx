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
