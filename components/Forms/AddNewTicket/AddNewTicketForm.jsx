'use client';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import InputToken from './Components/InputToken';

const AddNewTicketForm = ({ formAction }) => {
    const Router = useRouter();
    return (
        <form
            className="flex flex-col items-start gap-2.5 md:gap-3 1152:gap-4"
            action={async data => {
                const message = data.get('message');
                const token = data.get('token');
                if (!message) {
                    toast.error('you cant create a ticket without a message');
                    Router.push('/dashboard');
                    return;
                }

                const response = await formAction({ message, token });

                if (response?.ok) {
                    toast.success('Ticket successfuly created.');
                    Router.push('/dashboard');
                    return;
                } else {
                    toast.error(response);
                    return;
                }
            }}
        >
            <div className="flex flex-col w-full gap-1 md:gap-2 lg:gap-3">
                <textarea
                    className="block w-full px-3 py-2 rounded-lg border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 outline-none lg:px-4"
                    name="message"
                    rows="10"
                    maxLength={750}
                ></textarea>
                <InputToken />
                <DashboardBTN type="submit">Create</DashboardBTN>
            </div>
        </form>
    );
};
export default AddNewTicketForm;
