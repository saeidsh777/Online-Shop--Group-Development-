import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';


export default function DetialInput() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
                <label htmlFor="name" className="text-sm">
                    Name:
                </label>
                <div>
                    <input type="text" className="General_Input_1" />
                </div>
            </div>
            <div>
                <label htmlFor="value" className="text-sm">
                    Value:
                </label>
                <div className="flex items-center gap-1">
                    <input type="text" className="General_Input_1" />
                    <AiOutlineDelete className="cursor-pointer hover:text-red-500" />
                </div>
            </div>
        </div>
    );
}
