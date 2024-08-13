const DashboardBTN = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className={`flex justify-center rounded-md bg-blue-600 font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${props.className}`}
        >
            {children}
        </button>
    );
};
export default DashboardBTN;
