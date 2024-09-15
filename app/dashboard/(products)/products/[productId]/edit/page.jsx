import DashboardBox from '@/components/Boxes/DashboardBox';
import ProductEditForm from '@/components/Forms/ProductEditForm/ProductEditForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import { API_BASE_URL } from '@/utils/constants';
import React from 'react';

export default async function ProductEditPage({ params }) {
    const { productId } = params;
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
        cache: 'no-store',
    });
    const result = await res.json();
    const { _id, title, description, images, details } = result;
    const productData = {
        _id,
        productTitle: title,
        productDescription: description,
        productImagesDefault: images,
        productDetails: details,
    };
    return (
        <div className="mt-5">
            <SectionTitel title={'Product Edit'} />
            <DashboardBox>
                <ProductEditForm {...JSON.parse(JSON.stringify(productData))} />
            </DashboardBox>
        </div>
    );
}
