import DashboardBox from '@/components/Boxes/DashboardBox';
import TicketBox from '@/components/Boxes/TicketBox.jsx/TicketBox';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';

const TicketRoom = ({ params: { ticketID } }) => {
    return (
        <div>
            <SectionTitel title="Ticket" />
            <DashboardBox>
                <TicketBox ticketID={ticketID} isAdmin />
            </DashboardBox>
        </div>
    );
};

export default TicketRoom;
