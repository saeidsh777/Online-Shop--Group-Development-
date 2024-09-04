import ActionIcon from '@/components/Table/ActionIcons';
import Link from 'next/link';
import DelteButton from './Components/DelteButton';

const CategoryBoxFooter = ({ categoryName, categoryID }) => {
    return (
        <div className="rounded-lg rounded-t-none w-full py-1 categoryFooter shadow-sm md:py-1.5 max-h-0 max-w-0  overflow-hidden ">
            <div className="flex items-center justify-evenly w-full">
                <Link href={'/dashboard/categories/' + categoryID}>
                    <div className="flex items-center gap-1 cursor-pointer pl-1 pr-3 rounded-lg text-[#2563eb] hover:bg-blue-200">
                        <ActionIcon type={'update'} tooltip={false}>
                            <path
                                d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </ActionIcon>
                        Edit Category
                    </div>
                </Link>
                <DelteButton
                    categoryName={categoryName}
                    categoryID={categoryID}
                >
                    <div className="flex items-center gap-1 cursor-pointer pl-1 pr-3 rounded-lg text-[#dc2626] hover:bg-red-200">
                        <ActionIcon type={'delete'} tooltip={false}>
                            <path
                                d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </ActionIcon>
                        Delete Category
                    </div>
                </DelteButton>
            </div>
        </div>
    );
};
export default CategoryBoxFooter;
