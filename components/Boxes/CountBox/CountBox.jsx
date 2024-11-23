"use client"
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
export default function CountBox({
    imgSrc,
    title,
    count,
    icon,
    hrefDir,
    bg,
    textColer,
}) {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 relative overflow-hidden">
            <Image
                className="absolute -bottom-2 right-0 w-[6rem] h-[6rem]"
                src={imgSrc}
                alt="users image"
                width={200}
                height={200}
            />
            <div className="relative">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 border-b pb-2 pe-4 border-gray-100">
                        <span
                            className={`w-10 h-10 flex justify-center items-center ${bg} ${textColer} rounded-lg`}
                        >
                            {icon}
                        </span>
                        <p className="text-black font-bold ">{title}</p>
                    </div>
                    <div className="pb-2">
                        <Link
                            className="p-1 rounded-md bg-gray-100 block hover:bg-gray-200"
                            href={hrefDir}
                        >
                            <IoIosArrowRoundForward />
                        </Link>
                    </div>
                </div>
                <div className="flex items-center py-5">
                    <p className="text-4xl font-bold">
                        <span className='text-gray-400'>+</span> {count}
                    </p>
                </div>
            </div>
        </div>
    );
}
