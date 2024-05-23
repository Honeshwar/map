"use client";
import ElectionResult from "@/Components/Election Result/ElectionResult";
import FilterComponent from "@/Components/FilterComponent";
import FilterResult from "@/Components/FilterResult";
import { FilterContextProvider } from "@/context/FilterContext";

export default function Home() {
  return (
    <>
      {/* election result */}
      {/* <div>
        <ElectionResult />
      </div> */}

      {/* election result with map views and table */}
      <FilterContextProvider>
        <main className="w-full overflow-x-hidden">
          <FilterComponent />
          <FilterResult />
        </main>
      </FilterContextProvider>
    </>
  );
}

{
  /* <div className="w-full h-[500px] bg-black"></div> */
}
