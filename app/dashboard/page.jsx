import CountBox from '@/components/Boxes/CountBox/CountBox';
import { LuUsers } from 'react-icons/lu';
import { BsTicketPerforated } from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import ViewChart from '@/components/ViewChart/ViewChart';

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
    return (
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <CountBox
                    imgSrc="/images/user-icon.svg"
                    title="Users"
                    count={'500'}
                    icon={<LuUsers />}
                    hrefDir="/dashboard/users"
                    bg="bg-green-50"
                    textColer=" text-green-500"
                />
                <CountBox
                    imgSrc="/images/ticket-icon.svg"
                    title="Tickets"
                    count={'1000'}
                    icon={<BsTicketPerforated />}
                    hrefDir="/dashboard/tickets"
                    bg="bg-cyan-50"
                    textColer="text-cyan-500"
                />
                <CountBox
                    imgSrc="/images/product-icon.svg"
                    title="Products"
                    count={'3700'}
                    icon={<AiOutlineProduct />}
                    hrefDir="/dashboard/products"
                    bg="bg-yellow-50"
                    textColer="text-yellow-500"
                />
                <CountBox
                    imgSrc="/images/notification-icon.svg"
                    title="Notifications"
                    count={'500'}
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
