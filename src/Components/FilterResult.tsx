import dynamic from "next/dynamic";

import ConstituencyTable from "./Results/ConstituencyTable";
import DoughnutAndTable from "./Results/DoughnutAndTable";
// import ChartsComponents from "./Bar Charts/ChartsComponent";

const LazyMap = dynamic(() => import("./Results/Map"), {
  ssr: false,
});

export default function FilterResult() {
  return (
    <section>
      {/* doughnut, table and map  */}
      <div className="w-full bg-[#f2cbd1] border-t-2 border-b-2 border-yellow-400 flex justify-start md:justify-between flex-wrap ">
        <DoughnutAndTable />

        {/* {loading ? <Loading /> : <LazyMap />} */}
        <LazyMap />
      </div>

      {/* result bar chart and Table */}
      <div className="w-full pt-4 md:pt-8 px-5 md:px-20 flex flex-col gap-8 md:gap-8">
        <h1 className="text-[1rem] md:text-[1.5rem] font-bold text-[#d8ac00] text-center">
          Powered by: Dhruv Research
        </h1>
        {/* <ChartsComponents /> */}

        <ConstituencyTable />
      </div>
    </section>
  );
}
