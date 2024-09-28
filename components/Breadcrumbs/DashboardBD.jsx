'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

const DashboardBD = () => {
    const makeFirstLetterCapital = useCallback(word => {
        return `${word[0].toUpperCase()}${word.slice(1, word.length)}`;
    }, []);

    const pathname = usePathname();

    const pathnames = useMemo(() => {
        const PathNames = pathname.split('/').filter(p => p);
        const FormatedPathNames = [...PathNames].map(p => {
            // change dashes with spaces and capitalize it
            if (p.includes('-')) {
                const path = p
                    .split('-')
                    .map(p => makeFirstLetterCapital(p))
                    .join(' ');
                return path;
            }

            // capitalize the word
            return makeFirstLetterCapital(p);
        });

        // remove breadcrumb if path list has one child
        return FormatedPathNames.length === 1 ? [] : FormatedPathNames;
    }, [pathname, makeFirstLetterCapital]);

    const arrowElement = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="aspect-square w-4 425:w-5 lg:w-6 xl:w-[26px]"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                className="stroke-dashboard-text stroke-[2]"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
            ></path>
        </svg>
    );

    return (
        <div className="flex items-center gap-0.5 mb-3 sm:mb-4 896:mb-5 flex-wrap">
            {pathnames.map((path, index) => {
                const istheLastOne = pathnames.length > index + 1;
                const isHome = path === 'Dashboard';

                const rawPathName = path.includes(' ')
                    ? path.toLowerCase().split(' ').join('-')
                    : path.toLowerCase();

                const linkHref = pathname.slice(
                    0,
                    pathname.indexOf(rawPathName) + path.length
                );

                return (
                    <React.Fragment key={path}>
                        {!istheLastOne ? (
                            <span className="cursor-default">{path}</span>
                        ) : (
                            <Link
                                href={linkHref}
                                className="font-semibold underline underline-offset-2 hover:no-underline"
                            >
                                {isHome ? 'Home' : path}
                            </Link>
                        )}
                        {istheLastOne && arrowElement}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
export default DashboardBD;
