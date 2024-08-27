import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import Link from 'next/link';

const page = () => {
    return (
        <div>
            <SectionTitel title={'List of categories'} />
            <DashboardBox>
                <div className="flex sm:items-center justify-between mb-6 flex-col gap-1.5 sm:flex-row">
                    <div className="w-full max-w-xs 896:max-w-sm">
                        <DashboardInput
                            className="p-2 sm:px-3 md:py-2.5"
                            placeholder="Search..."
                        />
                    </div>
                    <Link
                        href={'/dashboard/add-new-category'}
                        className="w-fit"
                    >
                        <DashboardBTN paddingClasses="p-2 sm:px-3 md:py-2.5">
                            <p className="pr-2.5">+</p>Add Category
                        </DashboardBTN>
                    </Link>
                </div>
                <div className="relative rounded-lg shadow-sm bg-dashboard-text/10 p-2">
                    hello
                </div>
            </DashboardBox>
        </div>
    );
};
export default page;
