import DashboardBox from '@/components/Boxes/DashboardBox';
import AddNewCategoryForm from '@/components/Forms/AddNewCategory/AddNewCategoryForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';

const AddNewCategoryPage = () => {
    return (
        <div>
            <SectionTitel title={'Add New Category'} />
            <DashboardBox>
                <AddNewCategoryForm />
            </DashboardBox>
        </div>
    );
};
export default AddNewCategoryPage;
