import DashboardBox from '@/components/Boxes/DashboardBox';
import AddNewTicketForm from '@/components/Forms/AddNewTicket/AddNewTicketForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import { addTicket } from '@/services/ticket';

const AddNewTicket = () => {
    const formAction = async ({ message: Tmessage, token }) => {
        'use server';

        const response = await addTicket(Tmessage, token);

        if (response.ok) {
            return { ok: true };
        }

        if (typeof response === 'string') return response;
        const { message } = await response.json();
        const error_message =
            typeof message === 'string' ? message : message[0];
        return error_message;
    };

    return (
        <div>
            <SectionTitel title={'Create New Ticket'} />
            <DashboardBox>
                <AddNewTicketForm formAction={formAction} />
            </DashboardBox>
        </div>
    );
};
export default AddNewTicket;
