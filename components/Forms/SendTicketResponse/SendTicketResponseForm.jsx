import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import { AuthContext } from '@/contexts/AuthProvider';
import Revalidate from '@/hooks/useRevalidate';
import { sendTicketResponse } from '@/services/ticket';
import { useRouter } from 'next/navigation';
import { useContext, useRef } from 'react';
import toast from 'react-hot-toast';

const SendTicketResponseForm = ({ ticketID }) => {
    const Response_input_REF = useRef();
    const Response_button_REF = useRef();
    const {
        User: { token },
    } = useContext(AuthContext);
    const Router = useRouter();
    return (
        <form
            onSubmit={async e => {
                e.preventDefault();
                const value = Response_input_REF.current.value;

                const DisableForm = boolean => {
                    if (boolean) {
                        Response_input_REF.current.disabled = true;
                        Response_button_REF.current.disabled = true;
                        Response_input_REF.current.value = '';
                        return true;
                    }

                    Response_input_REF.current.disabled = false;
                    Response_input_REF.current.focus();
                    Response_button_REF.current.disabled = false;
                    Revalidate('/dashboard/my-tickets/' + ticketID);
                };
                DisableForm(true);

                if (!value) {
                    DisableForm(false);
                    return;
                }

                const response = await sendTicketResponse(
                    value,
                    ticketID,
                    token
                );

                if (response.ok) {
                    Response_input_REF.current.value = '';
                    toast.success('message sent successfuly');
                    Router.refresh();

                    DisableForm(false);
                    return;
                }
                if (typeof response === 'string') {
                    toast.error(response);

                    DisableForm(false);
                    return;
                }

                const result = await response.json();
                toast.error(result.message);
                DisableForm(false);
            }}
            className="w-full flex items-center gap-2"
        >
            <DashboardInput
                className="p-2 sm:px-3 md:py-2.5"
                placeholder="message..."
                name="message"
                ref={Response_input_REF}
            />
            <DashboardBTN
                ref={Response_button_REF}
                type="submit"
                paddingClasses="p-2 sm:px-3 md:py-2.5"
            >
                Send
            </DashboardBTN>
        </form>
    );
};
export default SendTicketResponseForm;
