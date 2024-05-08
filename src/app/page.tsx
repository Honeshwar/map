"use client";
import FilterComponent from "@/Components/FilterComponent";
import FilterResult from "@/Components/FilterResult";
import { FilterContextProvider } from "@/context/FilterContext";

export default function Home() {
  return (
    <FilterContextProvider>
      <main className="w-full">
        <FilterComponent />
        <FilterResult />
        {/* <div className="w-full h-[500px] bg-black"></div> */}
      </main>
    </FilterContextProvider>
  );
}
