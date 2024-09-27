'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { DeleteWrapper } from '@/hooks/useModal';
import GetTOken from '@/hooks/useToken';
import { deleteSingleProduct } from '@/services/product';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const DeleteProduct = ({ id, title, children }) => {
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
            {children}
        </DeleteWrapper>
    );
};
export default DeleteProduct;
