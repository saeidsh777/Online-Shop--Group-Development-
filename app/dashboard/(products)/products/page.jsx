import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import DashboardTableRow from '@/components/Others/DashboardTableRow';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import Link from 'next/link';

const page = () => {
    const products = [
        {
            name: 'test',
            imgSrc: 'https://picsum.photos/200',
            category: 'mobile',
            price: '20',
            discount: '0',
            id: '1',
        },
        {
            name: 'test',
            imgSrc: 'https://picsum.photos/200',
            category: 'mobile',
            price: '20',
            discount: '0',
            id: '2',
        },
    ];
    return (
        <div>
            <SectionTitel title={'Product List'} />
            <DashboardBox>
                <div className="flex sm:items-center justify-between mb-6 flex-col gap-1.5 sm:flex-row">
                    <div className="w-full max-w-xs 896:max-w-sm">
                        <DashboardInput
                            className="p-2 sm:px-3 md:py-2.5"
                            placeholder="Search..."
                        />
                    </div>
                    <Link href={'/dashboard/add-new-product'}>
                        <DashboardBTN paddingClasses="p-2 sm:px-3 md:py-2.5">
                            <p className="pr-2.5">+</p>Add Product
                        </DashboardBTN>
                    </Link>
                </div>
                <div class="relative overflow-x-auto rounded-lg shadow-sm">
                    <table class="w-full text-center">
                        <thead class="uppercase bg-gray-100 text-[68%] text-dashboard-title/85 font-medium border-b">
                            <tr>
                                <th scope="col" class="px-6 py-3 border-r">
                                    <span>#</span>
                                </th>
                                <th scope="col" class="px-10 py-3 border-x">
                                    product
                                </th>
                                <th scope="col" class="px-6 py-3 border-x">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3 border-x">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3 border-x">
                                    Discount
                                </th>
                                <th scope="col" class="px-6 py-3 border-l">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[80%]">
                            {products.map((product, index) => (
                                <DashboardTableRow
                                    key={product.id}
                                    {...product}
                                    index={index}
                                    // check for last item (to remove border-b)
                                    // true means no border-b
                                    borderB={products.length - 1 === index}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardBox>
        </div>
    );
};
export default page;
