import ProductModelEditForm from '@/components/Forms/ProductModelEditForm/ProductModelEditForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import { API_BASE_URL } from '@/utils/constants';
import React from 'react';

export default async function ProductModelEditPage({ params }) {
    const { productId, modelId } = params;
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
        cache: 'no-store',
    });
    const result = await res.json();
    const model = result.productModels[0].productModels.find(
        item => item._id === modelId
    );
    // console.log(result);
    console.log(model);

    return (
        <>
            <SectionTitel title={'Product Model Edit'} />

            <ProductModelEditForm {...JSON.parse(JSON.stringify(model))} />
        </>
    );
}
