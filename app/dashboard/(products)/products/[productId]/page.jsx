import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';

const page = ({ params: { productId } }) => {
    return (
        <div className="flex flex-col gap-3 sm:gap-5 md:gap-7 lg:gap-8">
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 md:gap-7 lg:gap-8">
                <div className="p-2 md:p-3 lg:p-3.5 bg-[#F3F5F7] w-64 375:w-56 425:w-64 mx-auto sm:mx-0 rounded-lg md:w-[37.5%] flex gap-1.5 md:gap-2 lg:gap-3 sm:flex-col 896:flex-row 896:flex-[0.85] max-w-md">
                    <div className="bg-slate-400 aspect-square rounded-lg flex-[3]"></div>
                    <div className="grid grid-rows-3 gap-2 md:gap-3 lg:gap-3.5  sm:grid-cols-3 sm:grid-rows-1 896:grid-cols-1 896:grid-rows-3 flex-1">
                        <div className="bg-slate-400 rounded-lg aspect-square"></div>
                        <div className="bg-slate-400 rounded-lg aspect-square"></div>
                        <div className="bg-slate-400 rounded-lg aspect-square"></div>
                    </div>
                </div>
                <div className="sm:flex-1 p-2 425:p-4 md:p-6 flex flex-col gap-4 sm:justify-between 896:justify-around">
                    <div className="flex flex-col gap-0.5 sm:gap-3">
                        <div className="flex items-center justify-between">
                            <p className="capitalize">name:</p>
                            <p className="text-dashboard-title font-medium">
                                Body spary golden {productId}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="capitalize">category:</p>
                            <p className="text-dashboard-title font-medium">
                                spray
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="capitalize">price:</p>
                            <p className="text-dashboard-title font-medium">
                                69$
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="capitalize">Discount:</p>
                            <p className="text-dashboard-title font-medium">
                                0%
                            </p>
                        </div>
                        <div>
                            <p
                                className="capitalize sm:mb-0.5 md:mb-1
                             lg:mb-2"
                            >
                                description:
                            </p>
                            <p className="text-justify pl-2.5 font-medium text-dashboard-title/90">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Autem tempore recusandae
                                doloremque vel, dignissimos doloribus?
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-1 sm:gap-2 896:gap-3">
                        <DashboardBTN>Edit</DashboardBTN>
                        <DashboardBTN colorClasses="bg-red-600 hover:bg-red-500 text-white focus-visible:outline-red-600 ">
                            Delete
                        </DashboardBTN>
                    </div>
                </div>
            </div>
            <DashboardBox className="w-fit">
                <h3>Related Products</h3>
                <hr />
                <div className="flex items-center flex-wrap gap-4 mt-4">
                    <div className="bg-purple-400 aspect-square w-20 425:w-24 md:w-28 896:w-32 lg:w-36 rounded-lg "></div>
                    <div className="bg-purple-400 aspect-square w-20 425:w-24 md:w-28 896:w-32 lg:w-36 rounded-lg "></div>
                    <div className="bg-purple-400 aspect-square w-20 425:w-24 md:w-28 896:w-32 lg:w-36 rounded-lg "></div>
                </div>
            </DashboardBox>
        </div>
    );
};
export default page;
