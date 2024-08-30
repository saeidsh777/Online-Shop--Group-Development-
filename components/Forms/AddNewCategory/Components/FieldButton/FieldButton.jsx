import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import Button from './Button';

const FieldButton = ({ Length, Add, Remove }) => {
    return (
        <div className="w-[45%] 425:w-1/3 md:w-1/4">
            {Length ? (
                <Button func={Remove} color="red">
                    <CiCircleMinus className="iconFontSize" />
                    Remove fields
                </Button>
            ) : (
                <Button func={Add} color="blue">
                    <CiCirclePlus className="iconFontSize" /> Add field
                </Button>
            )}
        </div>
    );
};

export default FieldButton;
