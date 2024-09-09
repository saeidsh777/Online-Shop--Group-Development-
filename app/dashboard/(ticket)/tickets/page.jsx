'use client';

import DashboardBox from '@/components/Boxes/DashboardBox';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import useResponse from '@/hooks/useResponse';
import getToken from '@/hooks/useToken';
import { getAllTickets } from '@/services/ticket';
import { useEffect, useState } from 'react';
import { TicketBox } from '../my-tickets/page';

const ListOfTickets = () => {
    const [tickets, setTickets] = useState([]);
    const responseHandler = useResponse();

    useEffect(() => {
        const token = getToken();
        const getTickets = async token => {
            const response = await getAllTickets(token);
            if (response?.ok) {
                const result = await response.json();
                console.log(result);
                setTickets(result);
            } else {
                await responseHandler(response);
            }
        };
        if (token) {
            getTickets(token);
        }
    }, [setTickets, responseHandler]);

    return (
        <div>
            <SectionTitel title="Active tickets" />
            <div>
                <DashboardBox>
                    <p className="text-[125%] text-dashboard-title mb-4 border-b-2">
                        Tickets
                    </p>
                    <div className="flex flex-col gap-2">
                        {tickets.map(ticket => (
                            <TicketBox
                                usedFor="ADMIN_TICKETS"
                                key={ticket._id}
                                text={ticket.messages[0].message}
                                ticketID={ticket._id}
                                active={ticket.isActive}
                            />
                        ))}
                    </div>
                </DashboardBox>
            </div>
        </div>
    );
};
export default ListOfTickets;
