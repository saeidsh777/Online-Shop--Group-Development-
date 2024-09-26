import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import { AuthContext } from '@/contexts/AuthProvider';
import { sendTicketResponse } from '@/services/ticket';
import { useRouter } from 'next/navigation';
import { useContext, useRef } from 'react';
import toast from 'react-hot-toast';

const SendTicketResponseForm = ({ ticketID }) => {
    const Response_input_REF = useRef();
    const {
        User: { token },
    } = useContext(AuthContext);
    const Router = useRouter();
    return (
        <form
            onSubmit={async e => {
                e.preventDefault();
                const { value } = Response_input_REF.current;

                if (!value) return;

                const response = await sendTicketResponse(
                    value,
                    ticketID,
                    token
                );

                if (response.ok) {
                    Response_input_REF.current.value = '';
                    toast.success('message sent successfuly');
                    Router.refresh();

                    return;
                }
                if (typeof response === 'string') {
                    toast.error(response);
                    return;
                }

                const result = await response.json();
                toast.error(result.message);
            }}
            className="w-full flex items-center gap-2"
        >
            <DashboardInput
                className="p-2 sm:px-3 md:py-2.5"
                placeholder="message..."
                name="message"
                ref={Response_input_REF}
            />
            <DashboardBTN type="submit" paddingClasses="p-2 sm:px-3 md:py-2.5">
                Send
            </DashboardBTN>
        </form>
    );
};
export default SendTicketResponseForm;
