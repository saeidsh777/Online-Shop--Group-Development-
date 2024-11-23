'use client';
import CountBox from '@/components/Boxes/CountBox/CountBox';
import { LuUsers } from 'react-icons/lu';
import { BsTicketPerforated } from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import ViewChart from '@/components/ViewChart/ViewChart';
import { getUserList } from '@/services/user';
import { Suspense, useEffect, useState } from 'react';
import { getAllTickets } from '@/services/ticket';
import { getAllProducts } from '@/services/product';
import { getAllNotifications } from '@/services/notification';

const VisitData = {
    data: [
        '132',
        '165',
        '180',
        '230',
        '580',
        '210',
        '280',
        '600',
        '560',
        '720',
        '430',
        '690',
    ],
    categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
};

const DollarData = {
    data: ['1320', '1605', '1180', '2930', '5580', '3210'],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
};
const DashboardHomepage = () => {
    const [userCount, setUserCount] = useState(0);
    const [ticketsCount, setTicketsCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [notificationsCount, setNotificationsCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const users = async () => {
            const { res, result } = await getUserList(token);

            if (res?.status === 200) {
                setUserCount(result.length);
            }
        };
        const tickets = async () => {
            const { res, result } = await getAllTickets(token);

            if (res?.status === 200) {
                setTicketsCount(result.length);
            }
        };
        const products = async () => {
            const { res, result } = await getAllProducts();

            if (res?.status === 200) {
                setProductsCount(result.length);
            }
        };
        const notifications = async () => {
            const { res, result } = await getAllNotifications(token);

            if (res?.status === 200) {
                setNotificationsCount(result.length);
            }
        };
        users();
        tickets();
        products();
        notifications();
    }, []);

    return (
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <CountBox
                    imgSrc="/images/user-icon.svg"
                    title="Users"
                    count={userCount}
                    icon={<LuUsers />}
                    hrefDir="/dashboard/users"
                    bg="bg-green-50"
                    textColer=" text-green-500"
                />
                <CountBox
                    imgSrc="/images/ticket-icon.svg"
                    title="Tickets"
                    count={ticketsCount}
                    icon={<BsTicketPerforated />}
                    hrefDir="/dashboard/tickets"
                    bg="bg-cyan-50"
                    textColer="text-cyan-500"
                />
                <CountBox
                    imgSrc="/images/product-icon.svg"
                    title="Products"
                    count={productsCount}
                    icon={<AiOutlineProduct />}
                    hrefDir="/dashboard/products"
                    bg="bg-yellow-50"
                    textColer="text-yellow-500"
                />
                <CountBox
                    imgSrc="/images/notification-icon.svg"
                    title="Notifications"
                    count={notificationsCount}
                    icon={<MdOutlineNotificationsActive />}
                    hrefDir="/dashboard/notification-list"
                    bg="bg-red-50"
                    textColer="text-red-500"
                />
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white p-4 rounded-lg h-[25rem] lg:col-span-2">
                    <ViewChart
                        type="area"
                        name="Visits"
                        title="Visit Statistics"
                        data={VisitData}
                    />
                </div>
                <div className="bg-white p-4 rounded-lg h-[25rem]">
                    <ViewChart
                        type="bar"
                        name="Dollar"
                        title="Financial Statistics"
                        data={DollarData}
                    />
                </div>
            </div>
        </div>
    );
};
export default DashboardHomepage;
