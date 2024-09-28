import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import ListIsEmpty from '@/components/Others/ListIsEmpty';
import DashboardTableRow from '@/components/Table/DashboardTableRow/DashboardTableRow';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import FilterList from '@/hooks/FilterList';
import RefreshPage from '@/hooks/RefreshPage';
import { getAllProducts } from '@/services/product';
import Link from 'next/link';

const ProductListPage = async ({ searchParams }) => {
    const result = await getAllProducts();

    if (typeof result === 'string' || !result) return <RefreshPage />;

    const { result: data, res: response } = result;

    const rendreData = data => {
        return (
            <>
                <div className="flex sm:items-center justify-between mb-6 flex-col gap-1.5 sm:flex-row">
                    <FilterList pathname={'/dashboard/products'} />
                    <Link href={'/dashboard/add-new-product'} className="w-fit">
                        <DashboardBTN paddingClasses="p-2 sm:px-3 md:py-2.5">
                            <p className="pr-2.5">+</p>Add Product
                        </DashboardBTN>
                    </Link>
                </div>
                <div className="relative overflow-x-auto rounded-lg shadow-sm">
                    <table className="w-full text-center">
                        <thead className="uppercase bg-gray-100 text-[68%] text-dashboard-title/85 font-medium border-b">
                            <tr>
                                <th scope="col" className="px-3 py-3 border-r">
                                    <span>#</span>
                                </th>
                                <th scope="col" className="px-3 py-3 border-x">
                                    Picture
                                </th>
                                <th scope="col" className="px-8 py-3 border-x">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-3 border-l">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[80%]">
                            {data.map((product, index) => (
                                <DashboardTableRow
                                    key={product._id}
                                    {...product}
                                    index={index}
                                    // check for last item (to remove border-b)
                                    // true means no border-b
                                    borderB={data.length - 1 === index}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    const filterDataHandler = (datas, search) => {
        const filtredData = search
            ? datas.filter(category =>
                  category.title.toLowerCase().includes(search.toLowerCase())
              )
            : datas;

        if (filtredData.length)
            return (
                <>
                    <p>
                        results found for ‘
                        <span className="text-black">{search}</span>’:
                    </p>
                    {rendreData(filtredData)}
                </>
            );

        return (
            <div className="text-[110%]">
                <p>
                    No results found for ‘
                    <span className="text-black">{search}</span>’.
                </p>
                <p>Try searching with a different name.</p>
                <p>
                    Or click{' '}
                    <Link
                        className="font-bold underline underline-offset-auto hover:no-underline text-blue-600"
                        href="/dashboard/products"
                    >
                        here
                    </Link>{' '}
                    to reset the search
                </p>
            </div>
        );
    };

    return (
        <div>
            <SectionTitel title={'List of products'} />
            <DashboardBox>
                {response?.ok ? (
                    data.length ? (
                        searchParams.search ? (
                            filterDataHandler(data, searchParams.search)
                        ) : (
                            rendreData(data)
                        )
                    ) : (
                        <ListIsEmpty
                            name="Product"
                            href="/dashboard/add-new-product"
                        />
                    )
                ) : (
                    <RefreshPage />
                )}
            </DashboardBox>
        </div>
    );
};
export default ProductListPage;
