import dynamic from "next/dynamic";

import ColumnBar from "./Bar Charts/ColumnBar";

import RowBar from "./Bar Charts/RowBar";

import ConstituencyTable from "./Results/ConstituencyTable";
import DoughnutAndTable from "./Results/DoughnutAndTable";

import { useFilterContextValue } from "@/context/FilterContext";
import { useState, useEffect } from "react";
const LazyMap = dynamic(() => import("./Results/Map"), {
  ssr: false,
});

import Loading from "./Loading";
import {
  formateData,
  convertColumnData,
  convertRowData,
  data,
} from "@/utils/helper-function";
import { ROW1, ROW2, COLUMN1, COLUMN2, COLUMN3 } from "@/utils/chartsDummyData";
import clsx from "clsx";
interface Column {
  title: string;
  dataValues: {
    //  [key:string]:number[]
  };
  labelArr: string[];
  years: number[];
  totalBars: number;
  colors: string[];
  legends: string[];
}
interface Row {
  title: string;
  dataValues: {}[];

  labelArr: string[];
  years: number[];
  totalBars: number;
  colors: string[];
  legends: string[];
}

const LazyColumnBar = dynamic(() => import("./Bar Charts/ColumnBar"), {
  ssr: false,
  loading: () => <Loading />,
});
const LazyRowBar = dynamic(() => import("./Bar Charts/RowBar"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function FilterResult() {
  const [c1, setC1] = useState<Row>(COLUMN1);
  const [c2, setC2] = useState<Row>(COLUMN2);
  const [c3, setC3] = useState<Row>(COLUMN3);
  const [r1, setR1] = useState<Row>(ROW1);
  const [r2, setR2] = useState<Row>(ROW2);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    filterData,
    select_sabha,
    loading,
    select_state,
    select_constituency,
    select_election_year,
    select_compare_year,
  } = useFilterContextValue();

  useEffect(() => {
    async function getChartsData() {
      try {
        setChartLoading(true);
        const response = await fetch(
          ` https://dhruvresearch.com/api/v2/result/demographics?election_type=${
            select_sabha === "Vidhan Sabha" ? "LS" : "LS"
          }
          `
          // ${select_sabha === "Vidhan Sabha" ? "&state=Goa" : ""}
        ); //NCT OF Delhi
        const resData = await response.json();

        if (JSON.stringify(resData.data[select_election_year]) === "{}") {
          return setError(true);
        }
        const fd = formateData(resData.data);

        //console.log("formateData", fd, resData.data);
        setC1({ ...COLUMN1, ...convertRowData(fd, "GENDER") });
        //console.log(
        //   "column 2",
        //   convertRowData(fd, "EDUCATION"),
        //   convertRowData(fd, "CATEGORY")
        // );
        setC2({ ...COLUMN2, ...convertRowData(fd, "EDUCATION") });
        setC3({ ...COLUMN3, ...convertRowData(fd, "CATEGORY") });

        const row1 = {
          ...ROW1,
          ...convertRowData(fd, "INCOME"),
        };
        const row2 = {
          ...ROW2,
          ...convertRowData(fd, "AGE"),
        };
        setR1(row1);
        setR2(row2);
        setChartLoading(false);
      } catch (error) {
        //console.log(error);
      } finally {
        setChartLoading(false);
      }
    }
    getChartsData();
  }, [select_sabha]);
  useEffect(() => {
    async function getChartsData() {
      try {
        setError(false);

        setChartLoading(true);
        const yearString =
          select_election_year !== "Select Election year"
            ? `&years=${JSON.stringify([
                select_election_year,
                ...select_compare_year,
              ])}`
            : "";
        //for charts filter data
        const chartResponse = await fetch(
          `https://dhruvresearch.com/api/v2/result/demographics/filter?election_type=${
            select_sabha === "Vidhan Sabha" ? "VS" : "LS"
          }&state=${select_state}&constituency=${
            select_sabha === "Vidhan Sabha"
              ? select_constituency.acNo
              : select_constituency.pcNo
          }${yearString}`
        );
        const chartResponseData = await chartResponse.json();
        if (
          JSON.stringify(chartResponseData.data[select_election_year]) ===
            "{}" ||
          JSON.stringify(
            chartResponseData.data[Object.keys(chartResponseData.data)[0]]
          ) === "{}"
        ) {
          return setError(true);
        }
        const fd = formateData(chartResponseData.data);
        //console.log("formateData", fd, chartResponseData.data);
        setC1({ ...COLUMN1, ...convertRowData(fd, "GENDER") });
        //console.log(
        //   "column 2",
        //   convertRowData(fd, "EDUCATION"),
        //   convertRowData(fd, "CATEGORY")
        // );
        setC2({ ...COLUMN2, ...convertRowData(fd, "EDUCATION") });
        setC3({ ...COLUMN3, ...convertRowData(fd, "CATEGORY") });

        const row1 = {
          ...ROW1,
          ...convertRowData(fd, "INCOME"),
        };
        const row2 = {
          ...ROW2,
          ...convertRowData(fd, "AGE"),
        };
        setR1(row1);
        setR2(row2);
        setChartLoading(false);
      } catch (error) {
        //console.log(error);
      } finally {
        setChartLoading(false);
      }
    }
    if (
      select_state !== "Select State" &&
      (select_sabha === "Vidhan Sabha"
        ? select_constituency.acNo !== -1
        : select_constituency.pcNo !== -1)
      //   &&
      // select_election_year !== "Select Election year"
    )
      getChartsData();
  }, [
    select_state,
    select_constituency,
    select_election_year,
    select_compare_year,
  ]);
  return (
    <section>
      {/* doughnut, table and map  */}
      <div className="w-full bg-[#f2cbd1] border-t-2 border-b-2 border-yellow-400 flex justify-start md:justify-between flex-wrap">
        <DoughnutAndTable />

        {loading ? <Loading /> : <LazyMap />}
      </div>

      {/* result bar chart and Table */}
      <div className="w-full pt-4 md:pt-8 px-5 md:px-20 flex flex-col gap-8 md:gap-8">
        <h1 className="text-[1rem] md:text-[1.5rem] font-bold text-[#d8ac00] text-center">
          Powered by: Dhruv Research
        </h1>

        {chartLoading ? (
          <Loading />
        ) : error ? (
          <p className=" text-red-500 h-[100px]">No data found</p>
        ) : (
          <>
            <LazyColumnBar
              {...c1}
              title="VOTER SHARE STATS"
              // chartLoading={chartLoading}
              chartNo={1}
              // error={error}
            />
            <LazyRowBar
              {...r1}
              title="Income Based"
              // chartLoading={chartLoading}
              // error={error}
            />

            <LazyColumnBar
              {...c2}
              title="Education"
              // chartLoading={chartLoading}
              chartNo={2}
              // error={error}
            />
            <LazyRowBar
              {...r2}
              title="Age Based"
              // chartLoading={chartLoading}
              // error={error}
            />
            <LazyColumnBar
              {...c3}
              title="Category Wise Vote Share"
              // chartLoading={chartLoading}
              chartNo={3}
              // error={error}
            />
          </>
        )}

        <ConstituencyTable />
      </div>
    </section>
  );
}
