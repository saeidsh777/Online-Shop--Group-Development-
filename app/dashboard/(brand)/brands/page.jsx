// app/dashboard/brands/page.jsx

import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import ListIsEmpty from '@/components/Others/ListIsEmpty';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import RefreshPage from '@/hooks/RefreshPage';
import { getAllBrands } from '@/services/brand';
import Link from 'next/link';
import BrandsList from '../../../../components/Boxes/BrandBox/BrandsList'; 

const Page = async ({ searchParams }) => {
  
  const brands = await getAllBrands();

  if (brands.err) return <RefreshPage />;

  const { result: Data } = brands;

  return (
    <div>
      <SectionTitel title={'List of brands'} />
      <DashboardBox>
        {Data.length ? (
          <>
            <div className="flex sm:items-center justify-between mb-6 flex-col gap-1.5 sm:flex-row">
              <Link href="/dashboard/add-new-brand" className="w-fit">
                <DashboardBTN paddingClasses="p-2 sm:px-3 md:py-2.5">
                  <p className="pr-2.5">+</p>Add Brand
                </DashboardBTN>
              </Link>
            </div>
            {/* render brandlist*/}
            <BrandsList brands={Data} searchParams={searchParams} />
          </>
        ) : (
          <ListIsEmpty name="Brand" href="/dashboard/add-new-brand" />
        )}
      </DashboardBox>
    </div>
  );
};

export default Page;
