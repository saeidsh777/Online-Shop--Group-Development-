'use client';

const Button = ({ children, func, color }) => {
    return (
        <button
            type="button"
            onClick={func}
            className={`flex items-center m-auto  justify-center gap-2  border rounded-lg transition-all duration-300 border-transparent  hover:py-2 hover:px-1 425:hover:py-2.5 sm:hover:py-3 lg:hover:py-3.5 sm:hover:px-2 md:hover:px-2.5 lg:hover:px-3 ${
                color === 'red'
                    ? 'text-red-500 hover:border-red-500'
                    : 'text-blue-500 hover:border-blue-500'
            }      
    `}
        >
            {children}
        </button>
    );
};

export default Button;
