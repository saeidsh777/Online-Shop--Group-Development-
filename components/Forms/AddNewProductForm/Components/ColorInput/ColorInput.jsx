import React from 'react';

export default function ColorInput() {
    return (
        <div className="flex items-center gap-2 mb-2">
            <label htmlFor="color" className="text-sm">
                Color:
            </label>
            <div>
                <input
                    id="color"
                    type="color"
                    className="General_Input_1 w-20"
                />
            </div>
        </div>
    );
}
