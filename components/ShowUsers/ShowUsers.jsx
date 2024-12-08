'use client';
import useToken from '@/hooks/useToken';
import useUser from '@/hooks/useUser';
import { changeUserRole, getUserList } from '@/services/user';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ShowUsers = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedRole, setUpdatedRole] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const token = useToken();
    const currentUser = useUser();

    useEffect(() => {
        const fetchUserList = async () => {
            if (!token) return;
            try {
                const { result } = await getUserList(token);
                setUserList(result);
            } catch (err) {
                toast.error('Failed to fetch user info');
            }
        };
        fetchUserList();
    }, [token]);

    const handleRoleChange = async (phoneNumber, newRole) => {
        setLoading(true);
        try {
            const { res } = await changeUserRole(phoneNumber, newRole, token);

            if (res.status === 200 || res.status === 201) {
                toast.success('User role updated successfully');
                setUpdatedRole({ phoneNumber, newRole });
            } else {
                toast.error('Failed to update role');
            }
        } catch (error) {
            toast.error('Error updating role');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (updatedRole) {
            setUserList(prevList =>
                prevList.map(user =>
                    user.phoneNumber === updatedRole.phoneNumber &&
                    user.role !== updatedRole.newRole
                        ? { ...user, role: updatedRole.newRole }
                        : user
                )
            );
        }
    }, [updatedRole]);

    const canChangeRole = role => {
        return currentUser?.role === 'owner' && role !== 'owner';
    };

    const handleShowProfile = user => {
        if (selectedUser?.phoneNumber === user.phoneNumber && showProfile) {
            setShowProfile(false);
        } else {
            setSelectedUser(user);
            setShowProfile(true);
        }
    };

    return (
        <div className="p-6">
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table-auto w-full text-left bg-white rounded-lg">
                    <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.length ? (
                            userList.map(user => (
                                <tr
                                    key={user.phoneNumber}
                                    className="hover:bg-gray-100 transition duration-300"
                                >
                                    <td className="border px-6 py-3">
                                        {user.name}
                                    </td>
                                    <td className="border px-6 py-3">
                                        {user.email}
                                    </td>
                                    <td className="border px-6 py-3">
                                        {user.phoneNumber}
                                    </td>
                                    <td className="border px-6 py-3">
                                        {canChangeRole(user.role) ? (
                                            <select
                                                onChange={e =>
                                                    handleRoleChange(
                                                        user.phoneNumber,
                                                        e.target.value
                                                    )
                                                }
                                                value={user.role}
                                                className="bg-white border-1 border-indigo-500 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all ease-in-out duration-200"
                                            >
                                                <option
                                                    value="admin"
                                                    className="text-indigo-600"
                                                >
                                                    Admin
                                                </option>
                                                <option
                                                    value="user"
                                                    className="text-indigo-600"
                                                >
                                                    User
                                                </option>
                                            </select>
                                        ) : (
                                            <select
                                                value={user.role}
                                                disabled
                                                className="bg-gray-100 border rounded px-3 py-1 cursor-not-allowed text-gray-500"
                                            >
                                                <option value="owner">
                                                    Owner
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="user">
                                                    User
                                                </option>
                                            </select>
                                        )}
                                    </td>
                                    <td className="border px-6 py-3 flex gap-4 items-center">
                                        <button
                                            className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ${
                                                selectedUser?.phoneNumber ===
                                                    user.phoneNumber &&
                                                showProfile
                                                    ? 'bg-red-500'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                handleShowProfile(user)
                                            }
                                        >
                                            {selectedUser?.phoneNumber ===
                                                user.phoneNumber && showProfile
                                                ? 'Hide Profile'
                                                : 'View Profile'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="hover:bg-gray-100 transition duration-300">
                                <td colSpan={5} className="text-center py-3">
                                    No user found!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showProfile && selectedUser && (
                <div className="mt-6 bg-gray-200 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                        Profile of {selectedUser.name}
                    </h2>
                    <p>date of sign up: {selectedUser.createdAt}</p>
                    <p>Phone: {selectedUser.phoneNumber}</p>
                </div>
            )}
        </div>
    );
};

export default ShowUsers;
