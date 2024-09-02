import { forwardRef } from 'react';

const DashboardInput = ({ ...props }, FRef) => {
    return (
        <input
            {...props}
            className={`block w-full px-3 rounded-lg border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 outline-none ${props.className}`}
            ref={FRef}
        />
    );
};

export default forwardRef(DashboardInput);
