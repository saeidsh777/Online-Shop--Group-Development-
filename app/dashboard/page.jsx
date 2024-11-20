import CountBox from '@/components/Boxes/CountBox/CountBox';
import { LuUsers } from 'react-icons/lu';
import { BsTicketPerforated } from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';
import { MdOutlineNotificationsActive } from 'react-icons/md';
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
            <div className="grid grid-cols-3">
                <div className="bg-white p-4 rounded-lg h-[20rem] col-span-2">
                    <h2>Views</h2>
                </div>
            </div>
        </div>
    );
};
export default DashboardHomepage;
