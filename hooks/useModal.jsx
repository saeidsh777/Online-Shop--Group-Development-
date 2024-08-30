'use client';

import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import { ModalContext } from '@/contexts/ModalProvider';
import { useContext, useRef } from 'react';
import toast from 'react-hot-toast';
import { FaXmark } from 'react-icons/fa6';

// wrap Wrapper components around the button you want to useModal on it
export const DeleteWrapper = ({ children, name, func }) => {
    const { setDeleteModal } = useModal();

    // consider to move this in modal component
    const DeleteItemHandler = close => {
        func();
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

export const AddTagWrapper = ({ children, func }) => {
    const { setTagModal, CloseModal } = useModal();
    const inputRef = useRef(null);

    const AddTagHandler = close => {
        const tag = inputRef.current.value;

        if (!tag) {
            close();
            toast.error('You cant add an empty tag.', { duration: 2000 });
            return;
        }

        func(tag);
        close();
    };

    const InputModal = (
        <DashboardInput
            ref={inputRef}
            onKeyDown={event => {
                if (event.code !== 'Enter') return;
                AddTagHandler(CloseModal);
            }}
            placeholder="Enter tag value"
            className="p-2 sm:p-2.5 lg:p-3 lg:px-5 1152:px-6 1152:py-5"
        />
    );

    return (
        <div
            onClick={() => {
                setTagModal(InputModal, AddTagHandler);
                setTimeout(() => {
                    inputRef.current.focus();
                }, 200);
            }}
        >
            {children}
        </div>
    );
};

const useModal = () => {
    const { CloseModal, setModal } = useContext(ModalContext);

    const setDeleteModal = (name, func) => {
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
                            func(CloseModal);
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

    const setTagModal = (Input, func) => {
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
                {Input}
                <div className="flex items-center gap-3 ml-auto">
                    <DashboardBTN
                        colorClasses="bg-gray-600 hover:bg-gray-500 text-white focus-visible:outline-gray-600 "
                        onClick={CloseModal}
                    >
                        Cancel
                    </DashboardBTN>
                    <DashboardBTN
                        onClick={() => {
                            func(CloseModal);
                        }}
                        colorClasses="bg-blue-600 hover:bg-blue-500 text-white focus-visible:outline-blue-600 "
                    >
                        Add
                    </DashboardBTN>
                </div>
            </DashboardBox>
        );

        setModal(Layout);
    };
    return { setDeleteModal, setTagModal, CloseModal };
};

export default useModal;
