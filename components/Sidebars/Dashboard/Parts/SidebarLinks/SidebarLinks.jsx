import PrivateRoleHandler from '@/components/Wrappers/PrivateRoleHandler';
import { Roles } from '@/utils/Roles';
import { AiOutlineContainer } from 'react-icons/ai';
import { BsBoxes, BsEnvelopePaper } from 'react-icons/bs';
import {
    MdOutlineAddBox,
    MdOutlineCategory,
    MdOutlineNotificationAdd,
} from 'react-icons/md';
import {
    TbCategoryPlus,
    TbGraph,
    TbHexagonalPrismPlus,
    TbHexagons,
    TbMailPlus,
} from 'react-icons/tb';
import { TfiLayoutListThumbAlt } from 'react-icons/tfi';
import SidebarLink from './Components/SidebarLink';
import SidebarLinkSection from './Components/SidebarLinkSection';

const SidebarLinks = () => {
    return (
        <div className="my-1 flex flex-col gap-2.5 overflow-y-auto 1152:overflow-x-hidden px-4 Dashboard_Sidebar-SidebarLinks">
            <PrivateRoleHandler minimum_Role={Roles.user}>
                <SidebarLink href={'/'} text={'Overview'}>
                    <TbGraph />
                </SidebarLink>
            </PrivateRoleHandler>
            <PrivateRoleHandler minimum_Role={Roles.admin}>
                <SidebarLinkSection title={'products'}>
                    <SidebarLink href={'/add-new-product'} text={'Add product'}>
                        <MdOutlineAddBox />
                    </SidebarLink>
                    <SidebarLink href={'/products'} text={'Product list'}>
                        <BsBoxes />
                    </SidebarLink>
                </SidebarLinkSection>
                <SidebarLinkSection title={'category'}>
                    <SidebarLink
                        href={'/add-new-category'}
                        text={'Add category'}
                    >
                        <TbCategoryPlus />
                    </SidebarLink>
                    <SidebarLink href={'/categories'} text={'Category list'}>
                        <MdOutlineCategory />
                    </SidebarLink>
                </SidebarLinkSection>
                <SidebarLinkSection title={'notifications'}>
                    <SidebarLink
                        href={'/create-notification'}
                        text={'Create Notification'}
                    >
                        <MdOutlineNotificationAdd />
                    </SidebarLink>
                    <SidebarLink
                        href={'/notification-list'}
                        text={'Notification List'}
                    >
                        <TfiLayoutListThumbAlt />
                    </SidebarLink>
                </SidebarLinkSection>
            </PrivateRoleHandler>
            <PrivateRoleHandler onlyRole={Roles.owner}>
                <SidebarLinkSection title={'brand'}>
                    <SidebarLink href={'/add-new-brand'} text={'Add brand'}>
                        <TbHexagonalPrismPlus />
                    </SidebarLink>
                    <SidebarLink href={'/brands'} text={'Brand list'}>
                        <TbHexagons />
                    </SidebarLink>
                </SidebarLinkSection>
            </PrivateRoleHandler>
            <SidebarLinkSection title={'ticket'}>
                <PrivateRoleHandler onlyRole={Roles.user}>
                    <SidebarLink
                        href={'/create-new-ticket'}
                        text={'Create ticket'}
                    >
                        <TbMailPlus />
                    </SidebarLink>
                    <SidebarLink href={'/my-tickets'} text={'My tickets'}>
                        <BsEnvelopePaper />
                    </SidebarLink>
                </PrivateRoleHandler>
                <PrivateRoleHandler minimum_Role={Roles.admin}>
                    <SidebarLink href={'/tickets'} text={'Ticket list'}>
                        <AiOutlineContainer />
                    </SidebarLink>
                </PrivateRoleHandler>
            </SidebarLinkSection>
        </div>
    );
};
export default SidebarLinks;
