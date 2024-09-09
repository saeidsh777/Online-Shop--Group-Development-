'use client';
import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import useResponse from '@/hooks/useResponse';
import GetToken from '@/hooks/useToken';
import { getMyTickets } from '@/services/ticket';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
            <div className="flex items-center justify-between p-2 flex-1 border-r-2 border-dashed border-r-dashboard-title/50 mr-2 gap-4">
                <Link
                    className="flex-1 line-clamp-1"
                    href={'/dashboard/my-tickets/' + ticketID}
                >
                    {text}
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
    const [Tickets, setTickets] = useState({
        all: 0,
        active: 0,
        close: 0,
        tickets: [],
    });
    const responseHandler = useResponse();

    useEffect(() => {
        const Token = GetToken();
        const ticketsFormater = tickets => {
            const all = tickets.length;
            let close = 0;
            let active = 0;
            tickets.forEach(({ isActive }) => {
                if (isActive) {
                    ++active;
                } else {
                    ++close;
                }
            });

            setTickets({
                active,
                all,
                close,
                tickets,
            });
        };
        const getTickets = async Token => {
            const response = await getMyTickets(Token);
            if (response?.ok) {
                const result = await response.json();
                ticketsFormater(result);
            } else {
                await responseHandler(response);
            }
        };
        if (Token) {
            getTickets(Token);
        }
    }, [setTickets, responseHandler]);

    return (
        <div>
            <SectionTitel title={'My Ticket List'} />

            <div className="grid grid-rows-4 gap-2 425:grid-cols-2 md:grid-cols-3 425:grid-rows-2 mb-6">
                <DetailBox Icon={AiOutlineContainer} Title="All">
                    <p className="text-center font-medium">{Tickets.all}</p>
                </DetailBox>
                <DetailBox Icon={BiEnvelopeOpen} Title="Active">
                    <p className="text-center font-medium">{Tickets.active}</p>
                </DetailBox>
                <DetailBox Icon={GoDiscussionClosed} Title="Closed">
                    <p className="text-center font-medium">{Tickets.close}</p>
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
                    {Tickets.tickets.map(ticket => (
                        <TicketBox
                            key={ticket._id}
                            text={ticket.messages[0].message}
                            ticketID={ticket._id}
                            active={ticket.isActive}
                        />
                    ))}
                </div>
            </DashboardBox>
        </div>
    );
};
export default UserTicketsPage;
