'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { DeleteWrapper } from '@/hooks/useModal';
import GetTOken from '@/hooks/useToken';
import { deleteSingleProduct } from '@/services/product';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import ActionIcon from '../ActionIcons';

const DeleteProduct = ({ id, title }) => {
    const { Handlers } = useContext(AuthContext);
    const Router = useRouter();

    return (
        <DeleteWrapper
            text={`This action delete "${title}" product permanently! Are you sure?`}
            func={async () => {
                const token = GetTOken();
                if (!token) {
                    toast.error('Token is undefind');
                    Handlers.LogoutHandler();
                    return;
                }

                const result = await deleteSingleProduct(id, token);
                if ('res' in result && result.res.ok) {
                    toast.success('Product Delete successfuly');
                    Router.refresh();
                    return;
                }

                toast.error('error');
            }}
        >
            <ActionIcon type={'delete'}>
                <path
                    d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </ActionIcon>
        </DeleteWrapper>
    );
};
export default DeleteProduct;
