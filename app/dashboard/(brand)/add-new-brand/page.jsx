import DashboardBox from '@/components/Boxes/DashboardBox';
//import AddNewCategoryForm from '@/components/Forms/AddNewCategory/AddNewCategoryForm';
import AddNewBrand from '@/components/Forms/AddNewBrand/AddNewBrandForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';

const AddNewCategoryPage = () => {
    return (
        <div>
            <SectionTitel title={'Add New Brand'} />
            <DashboardBox>
                <AddNewBrand />
            </DashboardBox>
        </div>
    );
};
export default AddNewCategoryPage;
