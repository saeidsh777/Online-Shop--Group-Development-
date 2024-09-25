import DashboardBox from '@/components/Boxes/DashboardBox';

import ProfileForm from '@/components/Forms/profile/ProfileForm';

import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import RefreshPage from '@/hooks/RefreshPage';
import { getUserInfo } from '@/services/user';
import React from 'react'

const page = async () => {
    const userInfo = await getUserInfo();

  if (userInfo.err) return <RefreshPage />;

  const { result: Data } = userInfo;
  console.log(Data)


  return (
    <div>
        <SectionTitel title={'profile'} />
        <DashboardBox>
          <ProfileForm />
      
        </DashboardBox>


    </div>
  )
}

export default page