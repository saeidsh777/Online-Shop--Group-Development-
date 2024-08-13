const DashboardBox = ({ children, className }) => {
    return (
        <div
            className={
                'rounded-lg bg-white border border-dashboard-text/20 p-2 425:p-4 md:p-6 ' +
                className
            }
        >
            {children}
        </div>
    );
};
export default DashboardBox;
