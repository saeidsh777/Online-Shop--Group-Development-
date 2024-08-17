import { BsBox } from 'react-icons/bs';
import { MdOutlineAddBox } from 'react-icons/md';
import { TbCategoryPlus, TbGraph, TbListDetails } from 'react-icons/tb';
import SidebarLink from './Components/SidebarLink';
import SidebarLinkSection from './Components/SidebarLinkSection';

const SidebarLinks = () => {
    return (
        <div className="mt-1 flex flex-col gap-2.5 overflow-y-auto 1152:overflow-x-hidden px-4 Dashboard_Sidebar-SidebarLinks">
            <SidebarLink href={'/'} text={'Overview'}>
                <TbGraph />
            </SidebarLink>
            <SidebarLinkSection title={'products'}>
                <SidebarLink href={'/add-new-product'} text={'Add product'}>
                    <MdOutlineAddBox />
                </SidebarLink>
                <SidebarLink href={'/products'} text={'Products list'}>
                    <TbListDetails />
                </SidebarLink>
                <SidebarLink href={'/products/12'} text={'Product page'}>
                    <BsBox />
                </SidebarLink>
            </SidebarLinkSection>
            <SidebarLinkSection title={'category'}>
                <SidebarLink href={'/add-new-category'} text={'Add category'}>
                    <TbCategoryPlus />
                </SidebarLink>
            </SidebarLinkSection>
        </div>
    );
};
export default SidebarLinks;