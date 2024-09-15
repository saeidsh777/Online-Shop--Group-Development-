import ProductModelEditForm from '@/components/Forms/ProductModelEditForm/ProductModelEditForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import { getSingleCategory } from '@/services/categories';
import { getOneProduct } from '@/services/product';

export default async function ProductModelEditPage({ params }) {
    const { productId, modelId } = params;
    const { res, result, err } = await getOneProduct(productId);
    let model;
    let categoryFields;

    if (res.status === 200) {
        model = result.productModels[0].productModels.find(
            item => item._id === modelId
        );
        const { response: responseCategory, result: resultCategory } =
            await getSingleCategory(result.category._id);
        categoryFields = JSON.parse(
            JSON.stringify(resultCategory.productVariantsSchema)
        );
    }

    return (
        <>
            <SectionTitel title={'Product Model Edit'} />

            <ProductModelEditForm
                {...JSON.parse(JSON.stringify(model))}
                categoryFields={categoryFields}
            />
        </>
    );
}
