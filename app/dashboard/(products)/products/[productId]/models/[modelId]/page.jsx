import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DeleteModel from '@/components/Table/DashboardModelsTableRow/DeleteModel';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import RefreshPage from '@/hooks/RefreshPage';
import { getOneProduct } from '@/services/product';
import Link from 'next/link';

const fieldsFormater = additionalFields => {
    let fields = [];
    for (let key in additionalFields) {
        const Field = { key, value: additionalFields[key] };
        fields.push(Field);
    }

    return fields;
};

export default async function ProductModelPage({
    params: { productId, modelId },
}) {
    const { res, result } = await getOneProduct(productId);

    if (!res?.ok || res.status === 500) {
        return <RefreshPage />;
    }

    const { models } = result;
    const { productModels } = models[0];
    const model = productModels.find(mode => mode._id === modelId);
    const { price, count, discount, additionalFields } = model;
    const Fields = fieldsFormater(additionalFields);

    return (
        <div>
            <SectionTitel title={'Product Model Details'} />
            <DashboardBox>
                <div className="ml-auto flex items-center gap-1 sm:gap-2 896:gap-3 border-b-2 pb-2 mb-2">
                    <Link
                        href={`/dashboard/products/${productId}/models/${modelId}/edit`}
                    >
                        <DashboardBTN>Edit</DashboardBTN>
                    </Link>
                    <DeleteModel
                        model_Id={modelId}
                        ChangeTo={`/dashboard/products/${productId}/models`}
                    >
                        <DashboardBTN colorClasses="bg-red-600 hover:bg-red-500 text-white focus-visible:outline-red-600 ">
                            Delete
                        </DashboardBTN>
                    </DeleteModel>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-auto border-b-2 pb-2 mb-2">
                    <div className="flex items-center justify-between">
                        <p className="capitalize text-dashboard-title font-semibold">
                            Orginal price:
                        </p>
                        <p>{price}$</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="capitalize text-dashboard-title font-semibold">
                            Count:
                        </p>
                        <p>{count}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="capitalize text-dashboard-title font-semibold">
                            Discount:
                        </p>
                        <p>{discount}$</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="capitalize text-dashboard-title font-semibold">
                            Price:
                        </p>
                        <p>{+price - +discount}$</p>
                    </div>
                </div>
                <div>
                    <p className="capitalize text-dashboard-title font-semibold">
                        Additional Fields:
                    </p>
                    <div className="p-2 sm:p-3 md:p-4">
                        <div className="grid grid-cols-1 gap-4">
                            {Fields.map(field => (
                                <div
                                    key={String(field.key)}
                                    className="flex items-center justify-between"
                                >
                                    <p className="capitalize text-dashboard-title font-semibold">
                                        {field.key}:
                                    </p>
                                    <p>{field.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DashboardBox>
        </div>
    );
}
