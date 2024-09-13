'use client';
import { CiCircleMore } from 'react-icons/ci';

const AddMoreField = ({ AddField }) => {
    return (
        <button
            onClick={AddField}
            className="flex items-center m-auto  justify-center gap-2 text-dashboard-sidebar-textActive/80 transition-colors duration-300  hover:text-dashboard-sidebar-textActive"
            type="button"
        >
            <CiCircleMore className="iconFontSize" />
            Add more field
        </button>
    );
};
export default AddMoreField;
