import CategoryBox from '@/components/Boxes/CategoryBox';
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
                <div className="flex flex-col gap-2 425:gap-2.5 sm:gap-3 896:gap-3.5">
                    <CategoryBox name="Mobile">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Nobis praesentium quod odit voluptates
                        accusantium, natus ab fugiat blanditiis? Voluptates,
                        est.
                    </CategoryBox>
                    <CategoryBox name="Laptop">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Nobis praesentium quod odit voluptates
                        accusantium, natus ab fugiat blanditiis? Voluptates,
                        est.
                    </CategoryBox>
                    <CategoryBox name="chicken">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Nobis praesentium quod odit voluptates
                        accusantium, natus ab fugiat blanditiis? Voluptates,
                        est.
                    </CategoryBox>
                </div>
            </DashboardBox>
        </div>
    );
};
export default page;
