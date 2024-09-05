import DashboardBox from '@/components/Boxes/DashboardBox';
import EditCategoryForm from '@/components/Forms/EditCategory/EditCategoryForm';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import RefreshPage from '@/hooks/RefreshPage';
import { getSingleCategory } from '@/services/categories';

const EditCategoryPage = async ({ params: { categoryID } }) => {
    const Category = await getSingleCategory(categoryID);

    if (typeof Category === 'string' || !Category.response.ok)
        return <RefreshPage />;

    return (
        <div>
            <SectionTitel title={'Edit Category'} />
            <DashboardBox>
                <EditCategoryForm category={Category.result} />
            </DashboardBox>
        </div>
    );
};
export default EditCategoryPage;
