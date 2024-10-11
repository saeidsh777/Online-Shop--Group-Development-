import DashboardBox from '@/components/Boxes/DashboardBox';


import ShowUsers from '@/components/ShowUsers/ShowUsers';

import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';


import React from 'react'

const page = async () => {
    

 


  return (
    <div>
        <SectionTitel title={'User List'} />
        <DashboardBox>
          <ShowUsers />
      
        </DashboardBox>


    </div>
  )
}

export default page