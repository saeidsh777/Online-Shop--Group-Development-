import AddNewProductFrom from "@/components/Forms/AddNewProductFrom/AddNewProductFrom";
import SectionTitel from "@/components/Titels/SectionTitel/SectionTitel";

export default function addNewProductPage() {
  return (
      <div className="mt-5">
          <SectionTitel title={'Add New Product'} />
          <AddNewProductFrom/>
      </div>
  );
}
