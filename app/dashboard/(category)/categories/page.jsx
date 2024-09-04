import CategoryBox from '@/components/Boxes/CategoryBox/CategoryBox';
import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import ListIsEmpty from '@/components/Others/ListIsEmpty';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import FilterList from '@/hooks/FilterList';
import RefreshPage from '@/hooks/RefreshPage';
import { getAllCategories } from '@/services/categories';
import Link from 'next/link';

const page = async ({ searchParams }) => {
    const categories = await getAllCategories();

    if (categories.err) return <RefreshPage />;

    const { result: Data } = categories;

    const rendredCategories = data =>
        data.map(category => <CategoryBox key={category.id} {...category} />);

    const filterCategoryHandler = (datas, search) => {
        const filtredCategory = search
            ? datas.filter(category =>
                  category.title.toLowerCase().includes(search.toLowerCase())
              )
            : datas;

        if (filtredCategory.length)
            return (
                <>
                    <p>
                        results found for ‘
                        <span className="text-black">{search}</span>’:
                    </p>
                    {rendredCategories(filtredCategory)}
                </>
            );

        return (
            <div className="text-[110%]">
                <p>
                    No results found for ‘
                    <span className="text-black">{search}</span>’.
                </p>
                <p>Try searching with a different name.</p>
                <p>
                    Or click{' '}
                    <Link
                        className="font-bold underline underline-offset-auto hover:no-underline text-blue-600"
                        href="/dashboard/categories"
                    >
                        here
                    </Link>{' '}
                    to reset the search
                </p>
            </div>
        );
    };

    return (
        <div>
            <SectionTitel title={'List of categories'} />
            <DashboardBox>
                {Data.length ? (
                    <>
                        <div className="flex sm:items-center justify-between mb-6 flex-col gap-1.5 sm:flex-row">
                            <FilterList />
                            <Link
                                href="/dashboard/add-new-category"
                                className="w-fit"
                            >
                                <DashboardBTN paddingClasses="p-2 sm:px-3 md:py-2.5">
                                    <p className="pr-2.5">+</p>Add Category
                                </DashboardBTN>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2 425:gap-2.5 sm:gap-3 896:gap-3.5">
                            {searchParams.search
                                ? filterCategoryHandler(
                                      Data,
                                      searchParams.search
                                  )
                                : rendredCategories(Data)}
                        </div>
                    </>
                ) : (
                    <ListIsEmpty
                        name="Category"
                        href="/dashboard/add-new-category"
                    />
                )}
            </DashboardBox>
        </div>
    );
};
export default page;
