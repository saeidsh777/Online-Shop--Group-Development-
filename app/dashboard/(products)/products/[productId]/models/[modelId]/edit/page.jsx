import ProductModelEditForm from '@/components/Forms/ProductModelEditForm/ProductModelEditForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import RefreshPage from '@/hooks/RefreshPage';
import { getSingleCategory } from '@/services/categories';
import { getOneProduct } from '@/services/product';
import { BsBoxes } from 'react-icons/bs';

export default async function ProductModelEditPage({ params }) {
    const { productId, modelId } = params;
    const { res, result, err } = await getOneProduct(productId);

    let model;
    let categoryFields;
    if (res.status === 200) {
        result.models.forEach(item => {
            if (item._id === modelId) {
                model = item.productModels[0];
                return;
            }
        });
        if (model) {
            const { response: responseCategory, result: resultCategory } =
                await getSingleCategory(result.category._id);
            categoryFields = JSON.parse(
                JSON.stringify(resultCategory.productVariantsSchema)
            );
        }
    }

    if (res.status === 500) {
        return <RefreshPage />;
    }

    if (!model) {
        return <RefreshPage />;
    }

    return (
        <>
            <SectionTitel title={'Product Model Edit'} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                    <div className="flex items-center ps-4 border border-gray-200 bg-white rounded-xl mb-3 h-[6rem] relative overflow-hidden">
                        <BsBoxes className="text-4xl text-gray-200 absolute right-1 bottom-1 w-24 h-20" />
                        <div className="relative flex-1">
                            <small className="font-bold">Product Name:</small>
                            <p className="text-gray-400 line-clamp-1 w-[80%]">
                                {result.title}
                            </p>
                        </div>
                    </div>
                </div>
                <ProductModelEditForm
                    {...JSON.parse(JSON.stringify(model))}
                    categoryFields={categoryFields}
                    productModelId={modelId}
                    productId={productId}
                    categoryId={result.category._id}
                />
            </div>
        </>
    );
}
