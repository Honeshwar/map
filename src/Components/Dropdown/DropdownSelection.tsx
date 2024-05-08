import ConstituencyDropdown from "./ConstituencyDropdown";
import ElectionYearDropdown from "./ElectionYearDropdown";
import StateDropdown from "./StateDropdown";

export default function DropdownSelection() {
  return (
    <div className="w-full flex flex-wrap  justify-center gap-5 md:justify-start md:gap-7">
      <StateDropdown />
      <ConstituencyDropdown />
      <ElectionYearDropdown />
    </div>
  );
}
