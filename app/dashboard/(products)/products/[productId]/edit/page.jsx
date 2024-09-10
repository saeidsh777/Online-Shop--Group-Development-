import DashboardBox from '@/components/Boxes/DashboardBox';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import React from 'react';

export default function ProductEditPage({ params }) {
    const { productId } = params;
    return (
        <div className="mt-5">
            <SectionTitel title={'Edit Product'} />
            <DashboardBox>
                
            </DashboardBox>
        </div>
    );
}
