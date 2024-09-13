import DashboardBox from '@/components/Boxes/DashboardBox';
import Tbody from './Table/Tbody';
import Tfoot from './Table/Tfoot/Tfoot';
import Thead from './Table/Thead';

const FieldsBox = props => {
    const { AddField, ...otherProps } = props;

    return (
        <DashboardBox className="w-full border-dashed">
            <table className="w-full">
                <Thead />
                <Tbody {...otherProps} />
                <Tfoot AddField={AddField} col={4} />
            </table>
        </DashboardBox>
    );
};
export default FieldsBox;
