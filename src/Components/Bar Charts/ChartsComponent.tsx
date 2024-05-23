import dynamic from "next/dynamic";
import { useFilterContextValue } from "@/context/FilterContext";
import { useState, useEffect } from "react";

import Loading from "../Loading";
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

const LazyColumnBar = dynamic(() => import("./ColumnBar"), {
  ssr: false,
  loading: () => <Loading />,
});
const LazyRowBar = dynamic(() => import("./RowBar"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function ChartsComponents() {
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
    async function getChartsData(url: string) {
      try {
        setError(false);

        setChartLoading(true);
        //for charts filter data
        const chartResponse = await fetch(url);
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
    // if (
    //   select_state !== "Select State" &&
    //   (select_sabha === "Vidhan Sabha"
    //     ? select_constituency.acNo !== -1
    //     : select_constituency.pcNo !== -1)
    //   //   &&
    //   // select_election_year !== "Select Election year"
    // )

    const electionTypeParam =
      select_sabha === "Vidhan Sabha" ? "election_type=VS" : "election_type=LS";
    const stateParam =
      select_state !== "Select State"
        ? `&state=${encodeURIComponent(select_state)}`
        : "";
    const constituencyParam =
      select_sabha === "Vidhan Sabha"
        ? select_constituency.acNo !== -1
          ? `&constituency=${select_constituency.acNo}`
          : ""
        : select_constituency.pcNo !== -1
        ? `&constituency=${select_constituency.pcNo}`
        : "";
    const yearsParams =
      select_election_year !== "Select Election year"
        ? `&years=${JSON.stringify([
            select_election_year,
            ...select_compare_year,
          ])}`
        : "";

    const url =
      process.env.NEXT_PUBLIC_API_URL +
      "/result/demographics/filter?" +
      electionTypeParam +
      stateParam +
      constituencyParam +
      yearsParams;
    getChartsData(url);
  }, [
    select_state,
    select_constituency,
    select_election_year,
    select_compare_year,
  ]);
  return (
    <>
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
    </>
  );
}
