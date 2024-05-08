import BreadCrumbs from "./Breadcrumbs";
import BreadCrumps from "./Breadcrumbs";
import DropdownSelection from "./Dropdown/DropdownSelection";
import SabhaSelection from "./SabhaSelection";

export default function FilterComponent() {
  return (
    <>
      <section className="w-fit md:pl-10 pt-5 pb-8">
        <BreadCrumbs />
        <SabhaSelection />
        <DropdownSelection />
      </section>
    </>
  );
}
