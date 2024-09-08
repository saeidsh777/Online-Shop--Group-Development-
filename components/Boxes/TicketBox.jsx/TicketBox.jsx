'use client';

import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import useResponse from '@/hooks/useResponse';
import getToken from '@/hooks/useToken';
import { getTicket } from '@/services/ticket';
import { useEffect, useMemo, useState } from 'react';
import DashboardBox from '../DashboardBox';

const MessageBox = props => {
    const { message, from, messageData } = props;
    const formatedDate = useMemo(() => {
        return new Date(messageData).toDateString();
    }, [messageData]);

    return (
        <div
            className={`p-2 md:p-3 lg:p-3.5 shadow  rounded-lg  425:max-w-[65%] md:max-w-[50%]  w-full   ${
                from === 'USER'
                    ? 'text-white bg-dashboard-sidebar-textActive mr-auto rounded-bl-none flex flex-col'
                    : 'text-dashboard-title bg-white ml-auto rounded-br-none'
            }`}
        >
            <p className="font-extralight">
                {from === 'USER' ? 'Me' : 'Admin'}:
            </p>
            {message}
            <div className="mt-1 ml-auto w-fit text-[75%]">{formatedDate}</div>
        </div>
    );
};

const TicketBox = ({ ticketID }) => {
    const [state, setState] = useState(null);
    const responseHandler = useResponse();

    useEffect(() => {
        const Token = getToken();
        const getData = async () => {
            const response = await getTicket(ticketID, Token);
            if (response?.ok) {
                const result = await response.json();
                console.log(result);
                console.log(new Date(result.createdAt).toDateString());
                setState(result);
            } else {
                responseHandler(response);
            }
        };
        if (Token) {
            getData();
        }
    }, [ticketID, responseHandler]);

    const createDateFormater = useMemo(() => {
        if (!state?.createdAt) return '';
        return new Date(state.createdAt).toDateString();
    }, [state]);

    if (!state) return 'Loading....';

    return (
        <div className="flex flex-col gap-4">
            <p>
                Created at:{' '}
                <span className="font-medium">{createDateFormater}</span>
            </p>
            {/* <DashboardBox className="border-dashed bg-dashboard-sidebar-hover flex flex-col gap-1 max-h-80 overflow-y-auto">
                {state.messages.map(message => (
                    <MessageBox key={message._id} message="heelo" from="USER" />
                ))}
                <MessageBox message="heelo" from="ADMIN" />
                <MessageBox message="heelo" from="USER" />
                <MessageBox message="heelo" from="ADMIN" />
                <MessageBox message="heelo" from="USER" />
                <MessageBox message="heelo" from="ADMIN" />
                <MessageBox message="heelo" from="USER" />
                <MessageBox message="heelo" from="ADMIN" />
            </DashboardBox> */}
            <form className="w-full flex items-center gap-2">
                <DashboardInput
                    className="p-2 sm:px-3 md:py-2.5"
                    placeholder="Search..."
                    name="search"
                />
                <DashboardBTN
                    type="submit"
                    paddingClasses="p-2 sm:px-3 md:py-2.5"
                >
                    Send
                </DashboardBTN>
            </form>
        </div>
    );
};
export default TicketBox;
