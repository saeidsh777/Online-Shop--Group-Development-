import DashboardBox from '@/components/Boxes/DashboardBox';
import EditUserForm from '@/components/Forms/EditUserForm/EditUserForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import { FaUser } from "react-icons/fa";

export default function UserPage() {
    
    return (
        <div>
            <SectionTitel title="User Profile" />
            <DashboardBox>
                <div className="flex items-center gap-2 border-b pb-3">
                    <span className="w-12 h-12 flex justify-center items-center border-2 border-gray-100 rounded-full text-gray-400">
                        <FaUser />
                    </span>
                    <small>Personal Information</small>
                </div>

                <div className='mt-5'>
                    <EditUserForm/>
                </div>
            </DashboardBox>
        </div>
    );
}
