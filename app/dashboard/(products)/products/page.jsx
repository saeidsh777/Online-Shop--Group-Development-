import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import DashboardTableRow from '@/components/Others/DashboardTableRow';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import RefreshPage from '@/hooks/RefreshPage';
import { getAllProducts } from '@/services/product';
import Link from 'next/link';

const ProductListPage = async () => {
    const result = await getAllProducts();

    if (result === 'error')
        return (
            <div>
                <h3 className="text-center font-medium text-[120%] mb-5">
                    Oops something went wrong!{' '}
                </h3>
                <RefreshPage />
            </div>
        );

    const { result: Data, res: response } = result;

    return (
        <div>
            <SectionTitel title={'List of products'} />
            <DashboardBox>
                {response.ok ? (
                    Data.length ? (
                        <>
                            <div className="flex sm:items-center justify-between mb-6 flex-col gap-1.5 sm:flex-row">
                                <div className="w-full max-w-xs 896:max-w-sm">
                                    <DashboardInput
                                        className="p-2 sm:px-3 md:py-2.5"
                                        placeholder="Search..."
                                    />
                                </div>

                                <Link
                                    href={'/dashboard/add-new-product'}
                                    className="w-fit"
                                >
                                    <DashboardBTN paddingClasses="p-2 sm:px-3 md:py-2.5">
                                        <p className="pr-2.5">+</p>Add Product
                                    </DashboardBTN>
                                </Link>
                            </div>
                            <div className="relative overflow-x-auto rounded-lg shadow-sm">
                                <table className="w-full text-center">
                                    <thead className="uppercase bg-gray-100 text-[68%] text-dashboard-title/85 font-medium border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r"
                                            >
                                                <span>#</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-10 py-3 border-x"
                                            >
                                                product
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-x"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-x"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-x"
                                            >
                                                Discount
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-l"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[80%]">
                                        {Data.map((product, index) => (
                                            <DashboardTableRow
                                                key={product.id}
                                                {...product}
                                                index={index}
                                                // check for last item (to remove border-b)
                                                // true means no border-b
                                                borderB={
                                                    Data.length - 1 === index
                                                }
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div>
                            <h3 className="text-center font-medium text-[120%] mb-5">
                                Products list is empty {':('}
                            </h3>
                            <p>
                                Would you like to add a product? click{' '}
                                <Link
                                    href="/dashboard/add-new-product"
                                    className="text-blue-600 underline underline-offset-auto hover:no-underline"
                                >
                                    here
                                </Link>
                            </p>
                        </div>
                    )
                ) : (
                    <div>
                        <h3 className="text-center font-medium text-[120%] mb-5">
                            Oops something went wrong!{' '}
                        </h3>
                        <RefreshPage />
                    </div>
                )}
            </DashboardBox>
        </div>
    );
};
export default ProductListPage;
