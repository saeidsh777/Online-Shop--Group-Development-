'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import DashboardBox from '../Boxes/DashboardBox';

const InterceptorModalWrapper = ({ children }) => {
    const Router = useRouter();

    const CloseModal = useCallback(() => {
        Router.back();
    }, [Router]);

    useEffect(() => {
        const ESClistener = event => {
            event.code === 'Escape' && CloseModal();
        };

        window.addEventListener('keydown', ESClistener);

        return () => {
            window.removeEventListener('keydown', ESClistener);
        };
    }, [CloseModal]);

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[11] bg-black/20"
            onClick={({ target, currentTarget }) => {
                target === currentTarget && CloseModal();
            }}
        >
            <DashboardBox className="flex flex-col gap-5 shadow-md w-full max-w-4xl">
                <div>
                    <div className="w-fit ml-auto">
                        <FaXmark
                            onClick={CloseModal}
                            className="iconFontSize text-dashboard-text cursor-pointer"
                        />
                    </div>
                    <hr />
                </div>
                <div className="max-h-[350px] overflow-y-auto">{children}</div>
            </DashboardBox>
        </div>
    );
};
export default InterceptorModalWrapper;
