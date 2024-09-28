import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardModalsTableRow from '@/components/Table/DashboardModalsTableRow/DashboardModalsTableRow';
import DeleteProduct from '@/components/Table/DashboardProductsTableRow/DeleteProduct';
import RefreshPage from '@/hooks/RefreshPage';
import { getOneProduct } from '@/services/product';
import { API_BASE_URL } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';

const DetailProductPage = async ({ params: { productId } }) => {
    const { res, result } = await getOneProduct(productId);

    if (!res?.ok || res.status === 500) {
        return <RefreshPage />;
    }

    const { images, title, description, models } = result;
    const { productModels } = models[0];

    return (
        <div className="flex flex-col gap-4 425:gap-5 sm:gap-6 lg:gap-8">
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 md:gap-7 lg:gap-8">
                <div className="p-2 md:p-3 lg:p-3.5 bg-[#F3F5F7] w-64 375:w-56 425:w-64 mx-auto sm:mx-0 rounded-lg md:w-[37.5%] flex gap-1.5 md:gap-2 lg:gap-3 sm:flex-col 896:flex-row 896:flex-[0.85] max-w-md">
                    {images[0] ? (
                        <div className="rounded-lg flex-[4.5] aspect-square overflow-hidden bg-slate-400">
                            <Image
                                src={API_BASE_URL + '/' + images[0]}
                                alt={title + 'product first image'}
                                className="w-full h-full"
                                width={800}
                                height={800}
                            />
                        </div>
                    ) : null}
                    {images.length > 1 ? (
                        <div className="grid grid-rows-3 gap-2 md:gap-3 lg:gap-3.5  sm:grid-cols-3 sm:grid-rows-1 896:grid-cols-1 896:grid-rows-3 flex-[1] items-stretch">
                            {images[1] ? (
                                <div className="rounded-lg aspect-square overflow-hidden bg-slate-400">
                                    <Image
                                        src={API_BASE_URL + '/' + images[1]}
                                        alt={title + 'product second image'}
                                        className="w-full h-full"
                                        width={800}
                                        height={800}
                                    />
                                </div>
                            ) : null}
                            {images[2] ? (
                                <div className="rounded-lg aspect-square overflow-hidden bg-slate-400">
                                    <Image
                                        src={API_BASE_URL + '/' + images[2]}
                                        alt={title + 'product third image'}
                                        className="w-full h-full"
                                        width={800}
                                        height={800}
                                    />
                                </div>
                            ) : null}
                            {images[3] ? (
                                <div className="rounded-lg aspect-square overflow-hidden bg-slate-400">
                                    <Image
                                        src={API_BASE_URL + '/' + images[3]}
                                        alt={title + 'product forth image'}
                                        className="w-full h-full"
                                        width={800}
                                        height={800}
                                    />
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
                <div className="sm:flex-1 p-2 425:p-4 md:p-6 flex flex-col gap-4 sm:justify-between 896:justify-around ">
                    <div className="flex flex-col gap-0.5 sm:gap-3">
                        <div className="flex items-center justify-between">
                            <p className="capitalize">name:</p>
                            <p className="text-dashboard-title font-medium">
                                {title}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="capitalize">category:</p>
                            <p className="text-dashboard-title font-medium">
                                {result.category.title}
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
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-1 sm:gap-2 896:gap-3">
                        <Link href={`/dashboard/products/${productId}/edit`}>
                            <DashboardBTN>Edit</DashboardBTN>
                        </Link>
                        <DeleteProduct
                            id={productId}
                            title={title}
                            ChangeTo={'/dashboard/products'}
                        >
                            <DashboardBTN colorClasses="bg-red-600 hover:bg-red-500 text-white focus-visible:outline-red-600 ">
                                Delete
                            </DashboardBTN>
                        </DeleteProduct>
                    </div>
                </div>
            </div>
            <DashboardBox>
                <p className="text-[125%] text-dashboard-title mb-4 border-b-2">
                    Models
                </p>
                <div className="relative overflow-x-auto rounded-lg shadow-sm">
                    <table className="w-full text-center">
                        <thead className="uppercase bg-gray-100 text-[68%] text-dashboard-title/85 font-medium border-b">
                            <tr>
                                <th scope="col" className="px-3 py-3 border-r">
                                    <span>#</span>
                                </th>
                                <th scope="col" className="px-8 py-3 border-x">
                                    Price
                                </th>
                                <th scope="col" className="px-8 py-3 border-x">
                                    Count
                                </th>
                                <th scope="col" className="px-8 py-3 border-x">
                                    Discount
                                </th>
                                <th scope="col" className="px-4 py-3 border-l">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[80%]">
                            {productModels.map((model, index) => (
                                <DashboardModalsTableRow
                                    key={model._id}
                                    model={model}
                                    index={index}
                                    productId={productId}
                                    borderB={productModels.length - 1 === index}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardBox>
        </div>
    );
};
export default DetailProductPage;
