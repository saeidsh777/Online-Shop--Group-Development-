'use client';

import CountBox from "@/components/Boxes/CountBox/CountBox";
import { BsTicketPerforated } from "react-icons/bs";

export default function DashboardUserTemplate() {
    return (
        <div className="grid grid-cols-2">
            <CountBox
                imgSrc="/images/ticket-icon.svg"
                title="Tickets"
                count={"232"}
                icon={<BsTicketPerforated />}
                hrefDir="/dashboard/my-tickets"
                bg="bg-cyan-50"
                textColer="text-cyan-500"
            />
        </div>
    );
}
