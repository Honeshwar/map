import { use, useState } from "react";
import { useFilterContextValue } from "../context/FilterContext";

export default function SabhaSelection() {
  const { select_sabha, setSelect_sabha, resetFilterToInitial } =
    useFilterContextValue();

  const [toggleSelection, setToggleSelection] = useState();
  const handleSabhaSelection = (name: string) => {
    //console.log("select_sabha: ", select_sabha, "updated: ", name);
    setSelect_sabha(name);

    resetFilterToInitial(4); //all input reset
  };
  return (
    <div className="pt-3 pb-5 md:py-4 flex flex-wrap justify-center md:justify-start gap-3 md:gap-14 items-center text-sm ">
      <h1 className="text-[1.5rem] font-bold">Election Result</h1>
      <div className="flex gap-5 md:gap-5">
        {select_sabha === "Vidhan Sabha" ? (
          <>
            <button
              onClick={() => handleSabhaSelection("Vidhan Sabha")}
              type="button"
              className="border-2 border-gray-400 bg-pink-100 px-3 py-[6px] font-[500] rounded-full"
            >
              Vidhan Sabha
            </button>
            <button
              onClick={() => handleSabhaSelection("Lok Sabha")}
              type="button"
              className="font-[500]"
            >
              Lok Sabha
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleSabhaSelection("Vidhan Sabha")}
              type="button"
              className="font-[500]"
            >
              Vidhan Sabha
            </button>
            <button
              onClick={() => handleSabhaSelection("Lok Sabha")}
              type="button"
              className="border-2 border-gray-400 bg-pink-100 px-3 py-[6px] font-[500] rounded-full"
            >
              Lok Sabha
            </button>
          </>
        )}
      </div>
    </div>
  );
}
