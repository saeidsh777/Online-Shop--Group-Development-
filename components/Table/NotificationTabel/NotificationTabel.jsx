'use client';

import { useContext, useEffect, useState } from 'react';
import ActionIcon from '../ActionIcons';
import { ModalContext } from '@/contexts/ModalProvider';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardBox from '@/components/Boxes/DashboardBox';
import {
    deleteNotification,
    getAllNotifications,
} from '@/services/notification';
import useToken from '@/hooks/useToken';
import toast from 'react-hot-toast';

export default function NotificationTabel() {
    const [notifications, setNotifications] = useState([]);
    const { CloseModal, setModal } = useContext(ModalContext);
    const token = useToken();

    useEffect(() => {
        const getNotifications = async () => {
            const { res, result } = await getAllNotifications(token);

            if (res.status === 200) {
                setNotifications(result.reverse());
            }
        };
        getNotifications();
    }, []);

    const viewNotif = message => {
        const Layout = (
            <div className="lg:max-w-[40rem]">
                <DashboardBox>
                    <p className="font-bold text-gray-500 border-b text-center mb-5">
                        MESSAGE
                    </p>
                    <small className="text-gray-600 mb-5 block">
                        {message}
                    </small>
                    <DashboardBTN
                        paddingClasses="lg:px-4 lg:py-2"
                        className="bg-gray-500"
                        onClick={CloseModal}
                    >
                        Close
                    </DashboardBTN>
                </DashboardBox>
            </div>
        );
        setModal(Layout);
    };

    const deleteNotif = id => {
        const deleteNotifHandler = async () => {
            const { res, result } = await deleteNotification(id);

            if (res.status === 201) {
                toast.success(result.message);
                CloseModal();
                const { res: resNotif, result: resultNotif } =
                    await getAllNotifications(token);

                if (resNotif.status === 200) {
                    setNotifications(resultNotif.reverse());
                }
            } else {
                toast.error(result.message);
            }
        };

        const Layout = (
            <div className="lg:max-w-[40rem]">
                <DashboardBox>
                    <p className="text-gray-500 text-center mb-5">
                        Do you want to <strong>Remove</strong> the notification?
                    </p>

                    <div className="flex gap-4 items-center">
                        <DashboardBTN
                            paddingClasses="lg:px-4 lg:py-2"
                            className="bg-gray-500"
                            onClick={CloseModal}
                        >
                            Cancel
                        </DashboardBTN>
                        <DashboardBTN
                            paddingClasses="lg:px-4 lg:py-2"
                            onClick={() => deleteNotifHandler()}
                        >
                            Delete
                        </DashboardBTN>
                    </div>
                </DashboardBox>
            </div>
        );
        setModal(Layout);
    };

    return (
        <>
            {notifications.length ? (
                <div className="relative overflow-x-auto rounded-lg shadow-sm">
                    <table className="w-full text-center">
                        <thead className="uppercase bg-gray-100 text-[68%] text-dashboard-title/85 font-medium border-b">
                            <tr>
                                <th scope="col" className="px-3 py-3 border-r">
                                    <span>#</span>
                                </th>
                                <th scope="col" className="px-3 py-3 border-r">
                                    <span>Date</span>
                                </th>
                                <th scope="col" className="px-3 py-3 border-x">
                                    Message
                                </th>
                                <th scope="col" className="px-3 py-3 border-l">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[80%]">
                            {notifications.map((notif, index) => {
                                let date = new Date(String(notif.createdAt));

                                return (
                                    <tr
                                        key={notif._id}
                                        className={`hover:bg-gray-50 text-dashboard-text ${
                                            notifications.length - 1 === 2
                                                ? 'border-b'
                                                : ''
                                        }`}
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">
                                            {date.toLocaleDateString('en-GB', {
                                                formatMatcher: 'basic',
                                            })}
                                        </td>
                                        <td className="p-3">
                                            <p className="line-clamp-1">
                                                {notif.message}
                                            </p>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex justify-center items-center gap-1.5">
                                                <span
                                                    onClick={() =>
                                                        viewNotif(notif.message)
                                                    }
                                                >
                                                    <ActionIcon type={'view'}>
                                                        <path
                                                            d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                    </ActionIcon>
                                                </span>
                                                <span
                                                    onClick={() =>
                                                        deleteNotif(notif._id)
                                                    }
                                                >
                                                    <ActionIcon type={'delete'}>
                                                        <path
                                                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                    </ActionIcon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <p>
                        There is no <strong>Notification!</strong>
                    </p>
                </div>
            )}
        </>
    );
}
