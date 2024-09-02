import AddMoreField from './AddMoreField';

const Tfoot = ({ AddField, col }) => {
    return (
        <tfoot>
            <tr>
                <td colSpan={col} className="text-center pt-3">
                    <AddMoreField AddField={AddField} />
                </td>
            </tr>
        </tfoot>
    );
};
export default Tfoot;
