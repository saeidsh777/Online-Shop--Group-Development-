const Tooltip = ({ children, text }) => {
    return (
        <div className="group relative">
            {children}
            <p className="absolute opacity-0 transition-all duration-300 group-hover:opacity-100 z-10 capitalize bottom-[115%] left-1/2 -translate-x-1/2 bg-white shadow-xl p-1 rounded-lg after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-m-1 after:border-4 after:border-solid after:border-transparent after:border-t-white ">
                {text}
            </p>
        </div>
    );
};
export default Tooltip;
