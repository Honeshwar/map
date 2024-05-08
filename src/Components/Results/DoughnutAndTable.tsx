import { useEffect, useState } from "react";
import Doughnut from "./Doughnut";
import Table from "./Table";
import { useFilterContextValue } from "../../context/FilterContext";
import Loading from "../Loading";

interface partyAndSeats {
  party: string;
  seats: number;
}
interface yearAndSeats {
  "2008": partyAndSeats[];
  "2009": partyAndSeats[];
  "2010": partyAndSeats[];
  "2011": partyAndSeats[];
  "2012": partyAndSeats[];
  "2013": partyAndSeats[];
  "2014": partyAndSeats[];
  "2015": partyAndSeats[];
  "2016": partyAndSeats[];
  "2017": partyAndSeats[];
  "2018": partyAndSeats[];
  "2019": partyAndSeats[];
  "2020": partyAndSeats[];
  "2021": partyAndSeats[];
  "2022": partyAndSeats[];
  "2023": partyAndSeats[];
}

export default function DoughnutAndTable() {
  const [electionResult, setElectionResult] = useState<any>([]);
  const [table, setTable] = useState<any>({});
  const { select_sabha, select_state, select_constituency } =
    useFilterContextValue();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getInitialElectionResult = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            `/result/election-result?election_type=${
              select_sabha === "Vidhan Sabha" ? "VS" : "LS"
            }`
        );
        const responseData = await response.json();
        // //console.log("response data doughnut and table", responseData.data);
        extractData(responseData.data, true);
        setLoading(false);
      } catch (error) {
        //console.log("error in fetch election result", error);
      }
    };
    setLoading(true);
    getInitialElectionResult();
  }, [select_sabha]);

  const { filterData, select_election_year } = useFilterContextValue();
  useEffect(() => {
    if (JSON.stringify(filterData) !== "{}") {
      extractData(filterData);
    }
  }, [filterData]);
  const [totalSeats, setTotalSeats] = useState<number>(0);

  const extractData = (data: any, isInitialData = false) => {
    const tableData = {
      year: [],
      seats: {},
      party: [],
    } as any;
    const doughnutData = {
      seats: [],
      party: [],
    } as {
      seats: number[];
      party: string[];
    };
    let incrementCount = 0,
      yearSelect = false,
      index = 0,
      totalYearCount = Object.keys(data).length;
    for (const year in data) {
      tableData.year.push(year); //year add in table
      for (const obj of data[year]) {
        // for initial data only
        if (isInitialData && (year == "2020" || year == "2019")) {
          // doughnutData.year.push(year);
          doughnutData.seats.push(Number(obj.seats));
          doughnutData.party.push(obj.party);
        }
        //dougghnut onluy single year data show
        if (!isInitialData && year == select_election_year) {
          doughnutData.seats.push(Number(obj.seats));
          doughnutData.party.push(obj.party);
        } else if (
          !isInitialData &&
          select_election_year === "Select Election year" &&
          index === totalYearCount - 1 &&
          !yearSelect
        ) {
          //last year select
          doughnutData.seats.push(Number(obj.seats));
          doughnutData.party.push(obj.party);
        }

        if (tableData.seats[obj.party] === undefined) {
          tableData.seats[obj.party] = [];
        }
        if (tableData.seats[obj.party].length !== incrementCount) {
          for (let addi = 0; addi < incrementCount; addi++) {
            tableData.seats[obj.party].push(undefined);
          }
        }
        tableData.seats[obj.party].push(Number(obj.seats));
        if (tableData.party.includes(obj.party) === false) {
          tableData.party.push(obj.party);
        }
      }
      incrementCount++;
      index++;
    }
    // //console.log("table data", tableData);
    setTable(tableData);
    //console.log("doughnut data", doughnutData);
    setElectionResult(doughnutData);

    let ts = 0;
    for (let a = 0; a < doughnutData.party.length; a++) {
      ts += doughnutData.seats[a];
    }
    setTotalSeats(ts);
  };

  useEffect(() => {
    if (select_state !== "Select State") {
      const getElectionResultByState = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL +
              `/result/election-result?election_type=${
                select_sabha === "Vidhan Sabha" ? "VS" : "LS"
              }&state=${select_state}`
          );
          const responseData = await response.json();
          // //console.log("response data doughnut and table", responseData.data);
          extractData(responseData.data, true);
          setLoading(false);
        } catch (error) {
          //console.log("error in fetch election result by state", error);
        }
      };

      getElectionResultByState();
    }
  }, [select_state]);

  useEffect(() => {
    if (
      select_state !== "Select State" &&
      (select_sabha === "Vidhan Sabha"
        ? select_constituency.acNo !== -1
        : select_constituency.pcNo !== -1)
    ) {
      const getElectionResultByConstituency = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL +
              `/result/election-result/filter?election_type=${
                select_sabha === "Vidhan Sabha" ? "VS" : "LS"
              }&state=${select_state}&constituency=${
                select_sabha === "Vidhan Sabha"
                  ? select_constituency.acNo
                  : select_constituency.pcNo
              }`
          );
          const responseData = await response.json();
          // //console.log("response data doughnut and table", responseData.data);
          extractData(responseData.data, true);
          setLoading(false);
        } catch (error) {
          console.log("error in fetch election result by state", error);
        }
      };

      getElectionResultByConstituency();
    }
  }, [select_constituency]);

  return (
    <div className="w-full md:w-1/2 min-h-[80vh] flex justify-center flex-col gap-10 pt-5 md:pt-10 pb-10 px-0 md:px-10">
      {/* && electionResult?.party?.length > 0 */}
      {!loading ? (
        <>
          <Doughnut electionResult={electionResult} totalSeats={totalSeats} />
          <Table data={table} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
