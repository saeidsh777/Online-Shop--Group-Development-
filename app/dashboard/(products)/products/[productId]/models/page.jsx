import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardModalsTableRow from '@/components/Table/DashboardModelsTableRow/DashboardModelsTableRow';
import RefreshPage from '@/hooks/RefreshPage';
import { getOneProduct } from '@/services/product';

export default async function ProductModelPage({ params: { productId } }) {
    const { res, result } = await getOneProduct(productId);

    if (!res?.ok || res.status === 500) {
        return <RefreshPage />;
    }

    const { models, title } = result;
    const { productModels } = models[0];
    return (
        <DashboardBox>
            <p className="text-[125%] text-dashboard-title mb-4 border-b-2">
                {'"' + title + '"'} Product Models
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
    );
}
