import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import Tooltip from '@/components/Others/Tooltip';
import { AddTagWrapper, DeleteWrapper } from '@/hooks/useModal';
import { Fragment } from 'react';
import toast from 'react-hot-toast';
import {
    CiCircleRemove,
    CiEraser,
    CiSquareMinus,
    CiSquarePlus,
} from 'react-icons/ci';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import { RxEraser, RxReset } from 'react-icons/rx';

const Tbody = props => {
    const {
        fields,
        ChangeName,
        AddTag,
        ToggleOptional,
        Remove,
        Reset,
        RemovTag,
    } = props;
    return (
        <tbody className="flex flex-col gap-2 mt-2">
            {fields.map((field, index) => (
                <Fragment key={index}>
                    <tr
                        className={`flex items-center sm:border-b sm:pb-1 ${
                            field.error
                                ? !field.name
                                    ? 'max-sm:border-b border-b-red-500'
                                    : ''
                                : ''
                        }`}
                    >
                        <td className="px-1 py-0.5 flex-[2.6] 425:flex-[2.6] md:flex-1  flex items-center justify-center">
                            <DashboardInput
                                className="p-2 sm:p-2.5 lg:p-3 lg:px-5 1152:px-6 1152:py-5 flex-1 text-center showRingsOnlyOnFocus bg-transparent"
                                placeholder="Field name..."
                                name="name"
                                value={field.name}
                                onChange={({ target }) => {
                                    ChangeName(field.id, target.value);
                                }}
                            />
                        </td>
                        <td className="px-1 py-0.5 flex-[1.4] 425:flex-[1.6] md:flex-[0.75]  flex items-center justify-center">
                            <div className="flex flex-wrap gap-1 items-center">
                                {field.tags.map(tag => (
                                    <div
                                        className="bg-gray-200/75 rounded-lg py-1 px-2 grow text-center relative group overflow-hidden cursor-pointer flex items-center justify-center gap-1.5"
                                        onClick={() => {
                                            RemovTag(tag, field.id);
                                        }}
                                        key={tag}
                                    >
                                        {tag}
                                        <p className="">
                                            <CiSquareMinus className="iconFontSize text-red-500" />
                                        </p>
                                        <p className="absolute -top-full  left-0  transition-all duration-300 group-hover:top-0 w-full h-full flex items-center justify-center bg-gray-200">
                                            <CiSquareMinus className="iconFontSize text-red-500 translate-y-[300%] transition-transform duration-300 group-hover:translate-y-0" />
                                        </p>
                                    </div>
                                ))}
                                <AddTagWrapper
                                    func={newTag => {
                                        const isExist = field.tags.some(
                                            tag => tag === newTag
                                        );
                                        if (isExist) {
                                            toast.error(
                                                `This tag is already existed in tag list! 
                                                tags can not be duplicated`,
                                                {
                                                    duration: 1500,
                                                }
                                            );
                                            return;
                                        }
                                        AddTag(newTag, field.id);
                                    }}
                                >
                                    <p className="whitespace-nowrap flex items-center cursor-pointer text-dashboard-sidebar-textActive grow hover:bg-dashboard-sidebar-textActive hover:text-white transition-colors duration-300 p-1 rounded-lg">
                                        <CiSquarePlus className="iconFontSize" />
                                        Tag
                                    </p>
                                </AddTagWrapper>
                            </div>
                        </td>
                        <td className="px-1 py-0.5 flex-1 max-w-16  425:max-w-20 lg:max-w-24 xl:max-w-28 flex items-center justify-center">
                            <label
                                htmlFor={'optionalField' + field.id}
                                className="cursor-pointer"
                            >
                                {field.isOptional ? (
                                    <MdOutlineCheckBox className="iconFontSize text-dashboard-sidebar-textActive" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="iconFontSize text-dashboard-text/50" />
                                )}
                            </label>
                            <input
                                type="checkbox"
                                id={'optionalField' + field.id}
                                value={field.isOptional}
                                className="hidden"
                                onChange={event => {
                                    ToggleOptional(event, field.id);
                                }}
                            />
                        </td>
                        <td className="px-1 py-0.5 flex-1 max-w-16  425:max-w-20 lg:max-w-24 xl:max-w-28 flex items-center gap-1.5 justify-center max-sm:hidden border-l-2">
                            <Tooltip text={'Remove'}>
                                <DeleteWrapper
                                    text={
                                        <span>
                                            Are you sure that you want delete
                                            this field?
                                            <br />
                                            this field is not empty!
                                        </span>
                                    }
                                    func={() => {
                                        Remove(field.id);
                                    }}
                                    condition={
                                        field.name ||
                                        field.tags.length ||
                                        field.isOptional
                                    }
                                >
                                    <RxEraser className="iconFontSize text-dashboard-text/60 hover:text-dashboard-text transition-colors duration-300 cursor-pointer" />
                                </DeleteWrapper>
                            </Tooltip>
                            <Tooltip text={'Reset'}>
                                <RxReset
                                    onClick={() => {
                                        Reset(field.id);
                                    }}
                                    className="iconFontSize text-dashboard-text/60 hover:text-dashboard-text transition-colors duration-300 cursor-pointer"
                                />
                            </Tooltip>
                        </td>
                    </tr>
                    <tr className="border-b pb-1 sm:hidden">
                        <td
                            colSpan={3}
                            className="flex items-center justify-between mt-4"
                        >
                            <p className="font-semibold">Field actions:</p>
                            <DeleteWrapper
                                text={
                                    <span>
                                        Are you sure that you want delete this
                                        field?
                                        <br />
                                        this field is not empty!
                                    </span>
                                }
                                func={() => {
                                    Remove(field.id);
                                }}
                                condition={
                                    field.name ||
                                    field.tags.length ||
                                    field.isOptional
                                }
                            >
                                <button
                                    type="button"
                                    className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors duration-300"
                                >
                                    <CiCircleRemove className="iconFontSize" />
                                    Remove
                                </button>
                            </DeleteWrapper>
                            <button
                                type="button"
                                onClick={() => {
                                    Reset(field.id);
                                }}
                                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-600 transition-colors duration-300"
                            >
                                <CiEraser className="iconFontSize" />
                                Reset
                            </button>
                        </td>
                    </tr>
                </Fragment>
            ))}
        </tbody>
    );
};
export default Tbody;
