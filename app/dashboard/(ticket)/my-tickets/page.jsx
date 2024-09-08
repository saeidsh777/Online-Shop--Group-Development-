import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import Link from 'next/link';
import { AiOutlineContainer } from 'react-icons/ai';
import { BiEnvelopeOpen } from 'react-icons/bi';
import { GoDiscussionClosed } from 'react-icons/go';
import { TbMailPlus } from 'react-icons/tb';

const DetailBox = ({ Icon, Title, children }) => {
    return (
        <DashboardBox className="w-full">
            <div className="flex gap-2 items-center w-full">
                <div className="iconFontSize text-[320%]">
                    <Icon />
                </div>
                <div className="flex items-center justify-between flex-1">
                    <p>{Title}:</p>
                    {children}
                </div>
            </div>
        </DashboardBox>
    );
};

const TicketBox = ({ text, ticketID, active }) => {
    return (
        <div className="md:p-3 lg:p-3.5 rounded-lg hover:bg-dashboard-sidebar-hover flex items-center">
            <div className="flex items-center justify-between p-2 flex-1 border-r-2 border-dashed border-r-dashboard-title/50 mr-2">
                <Link href={'/dashboard/my-tickets/' + ticketID}>
                    <p className="line-clamp-1 cursor-pointer">{text}</p>
                </Link>
                <Link href={'/dashboard/my-tickets/' + ticketID}>
                    <DashboardBTN>View</DashboardBTN>
                </Link>
            </div>

            <p>{active ? 'Active' : 'Closed'}</p>
        </div>
    );
};

const UserTicketsPage = () => {
    return (
        <div>
            <SectionTitel title={'My Ticket List'} />

            <div className="grid grid-rows-4 gap-2 425:grid-cols-2 md:grid-cols-3 425:grid-rows-2 mb-6">
                <DetailBox Icon={AiOutlineContainer} Title="All">
                    <p className="text-center font-medium">1</p>
                </DetailBox>
                <DetailBox Icon={BiEnvelopeOpen} Title="Active">
                    <p className="text-center font-medium">1</p>
                </DetailBox>
                <DetailBox Icon={GoDiscussionClosed} Title="Closed">
                    <p className="text-center font-medium">1</p>
                </DetailBox>
                <DetailBox Icon={TbMailPlus} Title="Create">
                    <Link href="/dashboard/create-new-ticket" className="w-fit">
                        <DashboardBTN paddingClasses="p-2 sm:px-3 md:py-2.5">
                            Create
                        </DashboardBTN>
                    </Link>
                </DetailBox>
            </div>

            <DashboardBox>
                <p className="text-[125%] text-dashboard-title mb-4 border-b-2">
                    Tickets
                </p>
                <div className="flex flex-col gap-2">
                    <TicketBox text={'hello'} ticketID={2} active={true} />
                </div>
            </DashboardBox>
        </div>
    );
};
export default UserTicketsPage;
