import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';

const page = () => {
    return (
        <div>
            <SectionTitel title={'Add New Category'} />
            <DashboardBox>
                <form className="flex flex-col items-start gap-2.5 md:gap-3 1152:gap-4">
                    <DashboardInput
                        className="p-3 sm:p-3.5 lg:p-4 lg:px-5 1152:px-6 1152:py-5"
                        placeholder="Category Name..."
                    />
                    <DashboardBTN className="ml-auto">Add</DashboardBTN>
                </form>
            </DashboardBox>
        </div>
    );
};
export default page;
