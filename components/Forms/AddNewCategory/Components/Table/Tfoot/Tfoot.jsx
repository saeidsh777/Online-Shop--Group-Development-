import AddMoreField from './AddMoreField';

const Tfoot = ({ AddField }) => {
    return (
        <tfoot>
            <tr>
                <td colSpan={3} className="text-center pt-3">
                    <AddMoreField AddField={AddField} />
                </td>
            </tr>
        </tfoot>
    );
};
export default Tfoot;
