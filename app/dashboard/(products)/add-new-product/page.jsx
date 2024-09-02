import DashboardBox from '@/components/Boxes/DashboardBox';
import AddNewProductForm from '@/components/Forms/AddNewProductForm/AddNewProductFrom';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import ProductProvider from '@/contexts/ProductProvider';

export default function addNewProductPage() {
    return (
        <div className="mt-5">
            <SectionTitel title={'Add New Product'} />
            <ProductProvider>
                <DashboardBox>
                    <AddNewProductForm />
                </DashboardBox>
            </ProductProvider>
        </div>
    );
}
