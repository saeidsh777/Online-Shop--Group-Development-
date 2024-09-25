import DashboardBox from '@/components/Boxes/DashboardBox';

import ProfileForm from '@/components/Forms/profile/ProfileForm';

import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';


import React from 'react'

const page = async () => {
    

 


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