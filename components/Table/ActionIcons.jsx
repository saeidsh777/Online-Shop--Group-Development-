const ActionIcon = ({ type, children: SVGsPaths, tooltip = true }) => {
    const types = {
        view: {
            bg: 'hover:bg-gray-200',
            color: 'currentColor',
        },
        delete: {
            bg: 'hover:bg-red-200',
            color: ' #dc2626',
        },
        update: {
            bg: 'hover:bg-blue-200',
            color: '#2563eb',
        },
    };

    return (
        <div
            className={`p-1.5 rounded-lg cursor-pointer relative group ${types[type].bg}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 aspect-square md:w-5 lg:w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke={types[type].color}
            >
                {SVGsPaths}
            </svg>
            {tooltip && (
                <p className="absolute opacity-0 group-hover:opacity-100 z-10 capitalize bottom-[115%] left-1/2 -translate-x-1/2 bg-white shadow-xl p-1 rounded-lg after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-m-1 after:border-4 after:border-solid after:border-transparent after:border-t-white invisible group-hover:visible">
                    {type}
                </p>
            )}
        </div>
    );
};

export default ActionIcon;
