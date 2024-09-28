'use client';
import { AuthContext } from '@/contexts/AuthProvider';
import { DeleteWrapper } from '@/hooks/useModal';
import Revalidate from '@/hooks/useRevalidate';
import GetTOken from '@/hooks/useToken';
import { deleteSingleModel } from '@/services/product';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const DeleteModel = ({ model_Id, children, ChangeTo = undefined }) => {
    const { Handlers } = useContext(AuthContext);
    const Router = useRouter();

    return (
        <DeleteWrapper
            text={`This action delete "${model_Id}" model permanently! Are you sure?`}
            func={async () => {
                const token = GetTOken();
                if (!token) {
                    toast.error('Token is undefind');
                    Handlers.LogoutHandler();
                    return;
                }

                const result = await deleteSingleModel(model_Id, token);
                if ('res' in result && result.res.ok) {
                    toast.success('Model Deleted successfuly');
                    Router.refresh();
                    if (ChangeTo !== undefined) {
                        Router.push(ChangeTo);
                        Revalidate(ChangeTo);
                    } else {
                        Router.refresh();
                    }
                    return;
                }
                if (typeof result === 'string') {
                    toast.error(result);
                    return;
                }

                toast.error(result.result.message);
            }}
        >
            {children}
        </DeleteWrapper>
    );
};
export default DeleteModel;
