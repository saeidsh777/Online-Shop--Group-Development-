'use client';

import SendTicketResponseForm from '@/components/Forms/SendTicketResponse/SendTicketResponseForm';
import useResponse from '@/hooks/useResponse';
import getToken from '@/hooks/useToken';
import { getTicket } from '@/services/ticket';
import { useEffect, useMemo, useState } from 'react';
import DashboardBox from '../DashboardBox';

const MessageBox = props => {
    const { message, fromMe, messageData, isAdmin } = props;

    // const formatedDate = useMemo(() => {
    //     return new Date(messageData).toDateString();
    // }, [messageData]);

    return (
        <div
            className={`425:max-w-[65%] md:max-w-[50%] w-full grid ${
                fromMe
                    ? 'grid-cols-[6px,1fr] mr-auto'
                    : 'grid-cols-[1fr,6px] ml-auto'
            }`}
        >
            <div
                className={`w-full h-full relative before:absolute before:content-[''] before:block before:w-[200%] before:h-full before:rounded-xl before:bg-dashboard-sidebar-hover grid grid-rows-[5fr,1fr] order-2 ${
                    fromMe ? 'before:right-0 order-1' : 'before:left-0 order-2'
                }`}
            >
                <div></div>
                <div
                    className={
                        fromMe ? 'bg-dashboard-sidebar-textActive' : 'bg-white '
                    }
                ></div>
            </div>
            <div
                className={`p-2 md:p-3 lg:p-3.5 rounded-lg w-full drop-shadow-lg  ${
                    fromMe
                        ? 'text-white bg-dashboard-sidebar-textActive rounded-bl-none flex flex-col order-2'
                        : 'text-dashboard-title bg-white rounded-br-none order-1'
                }`}
            >
                <p className="font-extralight">
                    {fromMe ? 'Me' : isAdmin ? 'User' : 'Admin'}:
                </p>
                {message}
                {/* <div className="mt-1 ml-auto w-fit text-[75%]">{formatedDate}</div> */}
            </div>
        </div>
    );
};

const TicketBox = ({ ticketID, isAdmin }) => {
    const [state, setState] = useState(null);
    const responseHandler = useResponse();

    useEffect(() => {
        const Token = getToken();
        const getData = async () => {
            const response = await getTicket(ticketID, Token, isAdmin);
            if (response?.ok) {
                const result = await response.json();
                setState(result);
            } else {
                await responseHandler(response);
            }
        };
        if (Token) {
            getData();
        }
    }, [ticketID, responseHandler, isAdmin]);

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
            <DashboardBox className="border-dashed flex flex-col gap-1 max-h-80 overflow-y-auto !bg-dashboard-sidebar-hover">
                {console.log(state)}
                {state.messages.map(message => (
                    <MessageBox
                        key={message._id}
                        message={message.message}
                        fromMe={
                            isAdmin
                                ? message.isAdmin
                                    ? true
                                    : false
                                : message.isAdmin
                                ? false
                                : true
                        }
                        isAdmin
                    />
                ))}
            </DashboardBox>
            <SendTicketResponseForm ticketID={ticketID} />
        </div>
    );
};
export default TicketBox;
