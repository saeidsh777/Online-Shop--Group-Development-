import CategoryBoxBody from './Components/CategoryBoxBody/CategoryBoxBody';
import CategoryBoxFooter from './Components/CategoryBoxFooter/CategoryBoxFooter';

const CategoryBox = ({ ...Category }) => {
    const { title, productVariantsSchema: Schemas, _id } = Category;

    return (
        <div className="flex flex-col categroy shadow-md rounded-lg border border-gray-100 transition-all duration-300">
            <label
                className="rounded-lg rounded-b-none border  border-transparent p-2 pt-1 425:pt-2 md:pt-4 md:p-3 lg:px-3.5 pb-0 md:pb-1 lg:pb-2 font-semibold flex items-center justify-between categroyLable transition-all duration-300 translate-y-0.5 cursor-pointer"
                htmlFor={title}
            >
                <span className="uppercase">{title}</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="aspect-square w-4 425:w-5 lg:w-6 xl:w-[26px] transition-all duration-300 -rotate-90"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        className="stroke-dashboard-text stroke-[2]"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
                    ></path>
                </svg>
            </label>

            <input type="checkbox" name={title} id={title} className="hidden" />
            <CategoryBoxBody Schemas={Schemas} Category={Category} />
            <CategoryBoxFooter categoryID={_id} categoryName={title} />
        </div>
    );
};
export default CategoryBox;
