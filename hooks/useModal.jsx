'use client';

import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import { ModalContext } from '@/contexts/ModalProvider';
import { API_BASE_URL } from '@/utils/constants';
import { useContext } from 'react';
import { FaXmark } from 'react-icons/fa6';

export const DeleteWrapper = ({ children, name, url, id }) => {
    const { setDeleteModal } = useModal();

    // consider to move this in modal component
    const DeleteItemHandler = close => {
        console.log('url=> ' + API_BASE_URL + url + id);
        // const response = await fetch(API_BASE_URL + url + id);
        // if (response.ok) {
        //     // toaast success

        //     return;
        // }

        // toast error

        // ------------- close modal
        close();
    };

    return (
        <div
            onClick={() => {
                setDeleteModal(name, DeleteItemHandler);
            }}
        >
            {children}
        </div>
    );
};

const useModal = () => {
    const { CloseModal, setModal } = useContext(ModalContext);

    const setDeleteModal = (name, DeleteFunc) => {
        const Layout = (
            <DashboardBox className="max-w-md lg:max-w-lg lg:gap-6 flex flex-col gap-5 shadow-md">
                <div>
                    <div className="w-fit ml-auto">
                        <FaXmark
                            onClick={CloseModal}
                            className="iconFontSize text-dashboard-text cursor-pointer"
                        />
                    </div>
                    <hr />
                </div>
                <p className="text-justify">
                    This action delete {name} permanently! Are you sure?
                </p>
                <div className="flex items-center gap-3 ml-auto">
                    <DashboardBTN
                        colorClasses="bg-gray-600 hover:bg-gray-500 text-white focus-visible:outline-gray-600 "
                        onClick={CloseModal}
                    >
                        Cancel
                    </DashboardBTN>
                    <DashboardBTN
                        onClick={() => {
                            DeleteFunc(CloseModal);
                        }}
                        colorClasses="bg-red-600 hover:bg-red-500 text-white focus-visible:outline-red-600 "
                    >
                        Delete
                    </DashboardBTN>
                </div>
            </DashboardBox>
        );

        setModal(Layout);
    };

    return { setDeleteModal };
};

export default useModal;
