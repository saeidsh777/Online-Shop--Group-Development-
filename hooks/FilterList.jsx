'use client';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const FilterList = ({ pathname }) => {
    const Router = useRouter();
    const inputRef = useRef();

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                const text = inputRef.current.value;
                const search = text ? '?search=' + text : '';

                inputRef.current.value = '';
                Router.push(pathname + search);
            }}
            className="w-full max-w-xs 896:max-w-md flex items-center gap-1"
        >
            <DashboardInput
                ref={inputRef}
                className="p-2 sm:px-3 md:py-2.5"
                placeholder="Search..."
                name="search"
            />
            <DashboardBTN type="submit" paddingClasses="p-2 sm:px-3 md:py-2.5">
                Search
            </DashboardBTN>
        </form>
    );
};
export default FilterList;
