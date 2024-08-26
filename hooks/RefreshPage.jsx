'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const RefreshPage = () => {
    const Params = useSearchParams();

    if (Params.has('tryRefresh'))
        return (
            <h2 className="font-bold">
                Sorry looks like refresh does not help!
                {'=> '}
                <Link
                    href="/dashboard"
                    className="font-bold underline underline-offset-auto hover:no-underline"
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
            className="font-bold underline underline-offset-auto hover:no-underline"
        >
            Refresh
        </Link>
    );
};
export default RefreshPage;
