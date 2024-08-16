import Image from 'next/image';

const RelatedPorductBox = ({ src, name }) => {
    return (
        <div className="flex flex-col gap-1.5 group transition-all duration-300 cursor-pointer rounded-lg relative overflow-hidden">
            <Image
                alt="test"
                src={src}
                width={100}
                height={100}
                className="aspect-square w-20 425:w-24 md:w-28 896:w-32 lg:w-36 rounded-lg group-hover:scale-125 transition-all duration-300"
            />
            <p className="group-hover:text-dashboard-title transition-all duration-500 group-hover:font-medium text-center absolute top-0 left-0 bg-[#F3F5F799] opacity-0 group-hover:opacity-100 w-full h-full flex items-center justify-center">
                {name}
            </p>
        </div>
    );
};
export default RelatedPorductBox;
