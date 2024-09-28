'use client';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import { sendNotificationToAll } from '@/services/notification';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NotificationBox() {
    const [message, setMessage] = useState('');

    const sendNotifHandler = async () => {
        const data = {
            message,
            users: ['all'],
        };

        const { res, result } = await sendNotificationToAll(data);

        if (res.status === 201) {
            setMessage('');
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };
    return (
        <div>
            <p className="font-bold text-gray-500 mb-4">New Notification:</p>
            <textarea
                className="General_Input_1 mb-4"
                placeholder="write your message..."
                rows={10}
                value={message}
                onChange={e => setMessage(e.target.value)}
                name="notification"
                id="notification"
            ></textarea>
            <DashboardBTN
                disabled={message ? false : true}
                className="disabled:bg-gray-400"
                onClick={sendNotifHandler}
            >
                Send To All
            </DashboardBTN>
        </div>
    );
}
