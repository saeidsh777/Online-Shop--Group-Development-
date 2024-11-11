import { forwardRef } from 'react';

const DashboardBTN = (props, Ref) => {
    const { children, paddingClasses, colorClasses, ...otherProps } = props;

    const defaultPadding = paddingClasses
        ? paddingClasses
        : ' py-1 px-3.5 sm:px-3.5 md:px-6 md:py-2 lg:px-8 lg:py-3 ';

    const defaultColor = colorClasses
        ? colorClasses
        : ' bg-blue-600 hover:bg-blue-500 text-white focus-visible:outline-blue-600 ';
    return (
        <button
            {...otherProps}
            ref={Ref}
            className={`flex justify-center rounded-md  font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-gray-500 disabled:cursor-not-allowed ${
                props.className + ' ' + defaultPadding + ' ' + defaultColor
            }`}
        >
            {children}
        </button>
    );
};
export default forwardRef(DashboardBTN);
