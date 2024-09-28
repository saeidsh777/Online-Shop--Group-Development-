import Link from 'next/link';
import ActionIcon from '../ActionIcons';
import DeleteModel from './DeleteModel';

const DashboardModalsTableRow = ({ model, index, borderB, productId }) => {
    return (
        <tr
            key={model._id}
            className={`hover:bg-gray-50 text-dashboard-text ${
                !borderB ? 'border-b' : ''
            }`}
        >
            <td className="px-3 py-3">{index}</td>
            <td className="px-8 py-3">{model.price}$</td>
            <td className="px-8 py-3">{model.count}</td>
            <td className="px-8 py-3">{model.discount}$</td>
            <td className="px-4 py-3">
                <div className="flex justify-center items-center gap-1.5">
                    <Link
                        href={
                            '/dashboard/products/' +
                            productId +
                            '/models/' +
                            model._id
                        }
                    >
                        <ActionIcon type={'view'}>
                            <path
                                d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </ActionIcon>
                    </Link>
                    <Link
                        href={
                            '/dashboard/products/' +
                            productId +
                            '/models/' +
                            model._id +
                            '/edit'
                        }
                    >
                        <ActionIcon type={'update'}>
                            <path
                                d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </ActionIcon>
                    </Link>
                    <DeleteModel model_Id={model._id}>
                        <ActionIcon type={'delete'}>
                            <path
                                d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </ActionIcon>
                    </DeleteModel>
                </div>
            </td>
        </tr>
    );
};
export default DashboardModalsTableRow;
