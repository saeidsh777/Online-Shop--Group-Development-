'use client';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import { sendNotification } from '@/services/notification';
import { getUserList } from '@/services/user';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function NotificationBox() {
    const [message, setMessage] = useState('');
    const [usersDefault, setUsersDefault] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersID, setUsersID] = useState([]);
    const [sendTo, setSendTo] = useState('all');
    const [search, setSearch] = useState('');
    const [searchUser, setSearchUser] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const token = localStorage.getItem('token');

            const { res, result } = await getUserList(token);

            if (res.status === 200) {
                const allUsers = result.map(user => ({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    selected: false,
                }));
                setUsersDefault(allUsers);
                setUsers(allUsers);
                setSearchUser(allUsers);
            }
        };
        getUsers();
    }, []);

    useEffect(() => {
        setSearchUser(users);
    }, [users]);

    const searchHandler = e => {
        setSearch(e.target.value);
        setSearchUser(users.filter(user => user.name.includes(e.target.value)));
    };

    const sendNotifHandler = async () => {
        const data = {
            message,
            users: usersID,
        };

        const { res, result } = await sendNotification(data);

        if (res.status === 201) {
            setMessage('');
            toast.success(result.message);
            setUsers(usersDefault);
            setSendTo('all');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
                <div className="lg:col-span-2">
                    <p className="font-bold text-gray-500 mb-4 ">
                        New Notification:
                    </p>
                    <textarea
                        className="General_Input_1 mb-4"
                        placeholder="write your message..."
                        rows={10}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        name="notification"
                        id="notification"
                    ></textarea>
                </div>

                <div className="lg:col-span-1">
                    <p className="font-bold text-gray-500 mb-4 ">Options:</p>
                    <div className="flex items-center gap-2 mb-5">
                        <div>
                            <label htmlFor="sendTo" className="text-sm">
                                Sent To:
                            </label>
                            <select
                                value={sendTo}
                                onChange={e => {
                                    setUsersID([]);
                                    setSendTo(e.target.value);
                                }}
                                className="General_Input_1 py-[.6rem]"
                                name="sendTo"
                                id="sendTo"
                            >
                                <option value="all">All Users</option>
                                <option value="select">Selected Users</option>
                            </select>
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="search_user" className="text-sm">
                                Search User:
                            </label>
                            <input
                                value={search}
                                onChange={searchHandler}
                                className="General_Input_1"
                                id="search_user"
                                type="text"
                                placeholder="search user"
                                disabled={sendTo === 'all' ? true : false}
                            />
                        </div>
                    </div>
                    {!!searchUser.length ? (
                        <div
                            className={`${
                                sendTo === 'select' ? 'block' : 'hidden'
                            } border border-gray-200 rounded-lg bg-white w-full overflow-hidden`}
                        >
                            <ul className="max-h-40 overflow-y-scroll">
                                {searchUser.map(user => (
                                    <li
                                        key={user._id}
                                        className="cursor-pointer group text-sm h-10 flex items-center"
                                        onClick={() => {
                                            setUsers(prv =>
                                                prv.map(item => {
                                                    if (item._id !== user._id)
                                                        return item;

                                                    return {
                                                        ...item,
                                                        selected:
                                                            !item.selected,
                                                    };
                                                })
                                            );

                                            if (
                                                !usersID.some(
                                                    item => item === user._id
                                                )
                                            ) {
                                                setUsersID(prv => [
                                                    ...prv,
                                                    user._id,
                                                ]);
                                            } else {
                                                setUsersID(prv =>
                                                    prv.filter(
                                                        item =>
                                                            item !== user._id
                                                    )
                                                );
                                            }

                                            setSearch('');
                                        }}
                                    >
                                        <p className="flex-grow flex items-center px-4 h-full relative">
                                            <span className="absolute flex justify-center items-center inset-0 w-full h-full invisible group-hover:visible bg-gray-50">
                                                {user.email}
                                            </span>
                                            {user.name}
                                        </p>
                                        <span
                                            className={`h-full w-8 ${
                                                user.selected
                                                    ? 'bg-green-400'
                                                    : 'bg-gray-400'
                                            }`}
                                        ></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <p className="text-center font-bold">No User</p>
                        </div>
                    )}
                </div>
            </div>
            <DashboardBTN
                disabled={message ? false : true}
                className="disabled:bg-gray-400"
                onClick={sendNotifHandler}
            >
                Create
            </DashboardBTN>
        </div>
    );
}
