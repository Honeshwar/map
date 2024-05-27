import clsx from "clsx";
import { useEffect, useState } from "react";
import { Interface } from "readline";
import Pagination from "./Pagination";
import Filter from "./FilterTable";
import { useFilterContextValue } from "@/context/FilterContext";
import Loading from "../Loading";
interface Candidate {
  state: string;
  year: number;
  acNo?: number;
  acName?: string;
  pcNo?: number;
  pcName?: string;
  candidateName: string;
  party: string;
  votesCount: number;
  votePercentage: number;
}

export default function ConstituencyTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<Candidate[]>([]);

  const [totalResults, setTotalResults] = useState(0);

  const [callNextPage, setCallNextPage] = useState(false);
  const {
    select_sabha,
    select_state,
    select_constituency,
    select_election_year,
    select_compare_year,
    constituencyFilterData,
  } = useFilterContextValue();

  const [filter, setFilter] = useState<string>("candidate"); //candidate or party
  // const [filterCall, setFilterCall] = useState(false); //candidate or party
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   if (JSON.stringify(constituencyFilterData) !== "{}") {
  //     setCurrentData(sortTable(constituencyFilterData.data, filter));
  //     setTotalPages(Math.ceil(constituencyFilterData.totalCount / 7));
  //     // setTotalPages(constituencyFilterData.previousPage); //totalCOunt/limit
  //     setTotalResults(constituencyFilterData.totalCount);
  //     setCurrentPage(1);
  //   }
  // }, [constituencyFilterData]);

  // useEffect(() => {
  //   const getCandidates = async () => {
  //     try {
  //       const response = await fetch(
  //         process.env.NEXT_PUBLIC_API_URL +
  //           `/result/candidates?election_type=${
  //             select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //           }&limit=7`
  //       );
  //       const responseData = await response.json();
  //       //console.log("resopnse ", responseData, responseData.data);

  //       setCurrentData(sortTable(responseData.data.data, filter));
  //       setTotalPages(Math.ceil(responseData.data.totalCount / 7));
  //       // setTotalPages(responseData.data.previousPage); //totalCOunt/limit
  //       setTotalResults(responseData.data.totalCount);
  //     } catch (error) {
  //       //console.log("error in getCandidates", error);
  //     }
  //   };

  //   getCandidates();
  // }, [select_sabha]);

  // useEffect(() => {
  //   const getCandidates = async (url: string) => {
  //     try {
  //       const response = await fetch(url);
  //       const responseData = await response.json();
  //       //console.log("resopnse ", responseData, responseData.data);

  //       setCurrentData(sortTable(responseData.data.data, filter));
  //       setTotalPages(Math.ceil(responseData.data.totalCount / 7));
  //       // setTotalPages(responseData.data.previousPage); //totalCOunt/limit
  //       setTotalResults(responseData.data.totalCount);
  //     } catch (error) {
  //       //console.log("error in getCandidates", error);
  //     }
  //   };
  //   if (select_state !== "Select State") {
  //     const url =
  //       process.env.NEXT_PUBLIC_API_URL +
  //       `/result/candidates?election_type=${
  //         select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //       }&limit=7&state=${encodeURIComponent(select_state)}`;
  //     getCandidates(url);
  //   } else {
  //     const url =
  //       process.env.NEXT_PUBLIC_API_URL +
  //       `/result/candidates?election_type=${
  //         select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //       }&limit=7`;
  //     getCandidates(url);
  //   }
  // }, [select_state]);

  useEffect(() => {
    const getCandidates = async (url: string) => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        //console.log("resopnse ", responseData, responseData.data);

        setCurrentData(sortTable(responseData.data.data, filter));
        setTotalPages(Math.ceil(responseData.data.totalCount / 7));
        // setTotalPages(responseData.data.previousPage); //totalCOunt/limit
        setTotalResults(responseData.data.totalCount);
        setCurrentPage(1);
      } catch (error) {
        //console.log("error in getCandidates", error);
      }
    };
    // if (select_state !== "Select State") {
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
        ? `&years=${select_election_year}`
        : "";

    const url =
      process.env.NEXT_PUBLIC_API_URL +
      "/result/candidates/filter?" +
      electionTypeParam +
      stateParam +
      constituencyParam +
      yearsParams +
      `&limit=7`;
    getCandidates(url);
    //else {
    //   const url =
    //     process.env.NEXT_PUBLIC_API_URL +
    //     `/result/candidates?election_type=${
    //       select_sabha === "Vidhan Sabha" ? "VS" : "LS"
    //     }&limit=7`;
    //   getCandidates(url);
    // }
  }, [select_sabha, select_state, select_constituency, select_election_year]);

  // useEffect(() => {
  //   if (JSON.stringify(candidates) !== "[]") {
  //     setCurrentData(candidates.slice(0, 7));
  //   }
  // }, [candidates]);

  useEffect(() => {
    const getDataFromPageNO = async (url: string) => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        //console.log("resopnse of each page ", responseData, responseData.data);

        setCurrentData(sortTable(responseData.data.data, filter));
        setTotalPages(Math.ceil(responseData.data.totalCount / 7));
        // setTotalPages(responseData.data.previousPage); //totalCOunt/limit
        setTotalResults(responseData.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.log("error in getDataFromPageNO", error);
      } finally {
        setCallNextPage(false);
      }
    };

    //defeault data
    // if (callNextPage && JSON.stringify(constituencyFilterData) === "{}") {
    //   const url =
    //     process.env.NEXT_PUBLIC_API_URL +
    //     `/result/candidates?election_type=${
    //       select_sabha === "Vidhan Sabha" ? "VS" : "LS"
    //     }&limit=7&page=` +
    //     currentPage;
    //   setLoading(true);
    //   getDataFromPageNO(url);
    // } else
    if (callNextPage) {
      // const url =
      //   process.env.NEXT_PUBLIC_API_URL +
      //   `/result/candidates/filter?election_type=${
      //     select_sabha === "Vidhan Sabha" ? "VS" : "LS"
      //   }&limit=7&page=` +
      //   currentPage +
      //   "&state=" +
      //   select_state +
      //   "&constituency=" +
      //   (select_sabha === "Vidhan Sabha"
      //     ? select_constituency.acNo
      //     : select_constituency.pcNo) +
      //   "&year=" +
      //   select_election_year;

      const electionTypeParam =
        select_sabha === "Vidhan Sabha"
          ? "election_type=VS"
          : "election_type=LS";
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
          ? `&years=${select_election_year}`
          : "";

      const url =
        process.env.NEXT_PUBLIC_API_URL +
        "/result/candidates/filter?" +
        electionTypeParam +
        stateParam +
        constituencyParam +
        yearsParams +
        `&limit=7&page=` +
        currentPage;
      setLoading(true);
      getDataFromPageNO(url);
    }
  }, [callNextPage]);

  // useEffect(() => {
  //   const getDataFromPageNO = async (url) => {
  //     try {
  //       const response = await fetch(url);
  //       const responseData = await response.json();
  //       //console.log("resopnse of each page ", responseData, responseData.data);

  //       setCurrentData(sortTable(responseData.data.data, filter));
  //       setTotalPages(Math.ceil(responseData.data.totalCount / 7));
  //       // setTotalPages(responseData.data.previousPage); //totalCOunt/limit
  //       setTotalResults(responseData.data.totalCount);
  //     } catch (error) {
  //       //console.log("error in getDataFromPageNO", error);
  //     } finally {
  //     }
  //   };

  //   //filter data
  //   if (filterCall) {
  //     //console.log("call at pagination filter", filterCall);
  //     setCurrentPage(1);
  //     const url =
  //       process.env.NEXT_PUBLIC_API_URL +
  //       `/result/candidates/filter?election_type=${
  //         select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //       }&limit=7&page=` +
  //       1 +
  //       "&state=" +
  //       select_state +
  //       "&constituency=" +
  //       (select_sabha === "Vidhan Sabha"
  //         ? select_constituency.acNo
  //         : select_constituency.pcNo) +
  //       "&year=" +
  //       select_election_year;
  //     getDataFromPageNO(url);
  //   }
  // }, [filterCall]);

  // useEffect(() => {
  //   if (
  //     select_state !== "Select State" &&
  //     (select_sabha === "Vidhan Sabha"
  //       ? select_constituency.acNo !== -1
  //       : select_constituency.pcNo !== -1) &&
  //     select_election_year !== "Select Election year"
  //   ) {
  //     setFilterCall(true);
  //   }
  // }, [select_state, select_constituency, select_election_year]);

  const handlePageChange = (newPage: number) => {
    // if(newPage < 1 || newPage > totalPages) return
    //circular, arrow works
    // if (newPage < 1) newPage = totalPages;
    // if (newPage > totalPages) newPage = 1;

    if (newPage < 1 || newPage > totalPages) return;

    setCurrentData(candidates.slice((newPage - 1) * 7, newPage * 10));
    setCurrentPage(newPage);
    setCallNextPage(true);
  };

  const sortTable = (currentData: Candidate[], value: string) => {
    currentData.sort((a: Candidate, b: Candidate) => {
      let first = "";
      let second = "";
      if (value === "candidate") {
        first = a.candidateName.toUpperCase(); // Convert to uppercase for case-insensitive comparison
        second = b.candidateName.toUpperCase(); // Convert to uppercase for case-insensitive comparison
      } else {
        first = a.party.toUpperCase(); // Convert to uppercase for case-insensitive comparison
        second = b.party.toUpperCase();
      }

      if (first < second) {
        return -1; // b a , swap needed
      }
      if (first > second) {
        return 1; // a b no need to swap
      }
      return 0; // If names are equal
    });

    //console.log("sorted ", candidates);
    // setCandidates([...candidates]); //spread operator also not give deep copy , nested object
    // setFilter(value);
    return currentData;
  };
  // const sort = (data: Candidate[]): Candidate[] => {
  //   // //console.log("data ", data);
  //   // Sorting the data array by candidateName in chronological order
  //   data.sort((a, b) => {
  //     const candidateNameA = a.candidateName.toUpperCase(); // Convert to uppercase for case-insensitive comparison
  //     const candidateNameB = b.candidateName.toUpperCase();

  //     if (candidateNameA < candidateNameB) {
  //       return -1;
  //     }
  //     if (candidateNameA > candidateNameB) {
  //       return 1;
  //     }
  //     return 0; // If names are equal
  //   });

  //   // //console.log(data);
  //   return data;
  // };
  // useEffect(() => {
  //   //console.log("currentData ", candidates);
  // });

  // useEffect(() => {
  //   if(filter !== "")
  //   sortTable(currentData,filter);
  // }, [filter])

  return (
    <div className="w-full mx-auto max-w-[1400px] pt-4 md:pt-8 flex flex-col gap-5 relative">
      <div>
        <h1 className="text-[1rem] md:text-[1.5rem] font-bold text-[#d8ac00] text-center">
          Powered by: ECI
        </h1>
        {/* <Filter
          filter={filter}
          sortTable={sortTable}
          setFilter={setFilter}
          currentData={currentData}
          setCurrentData={setCurrentData}
        /> */}
        <div className="absolute   md:top-10 right-0  text-[1.2rem] text-[gray]">
          <span className="text-[.8rem] md:text-[1rem] text-black font-semibold">
            Candidate
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 pb-8 ">
        <h1 className="text-[.8rem] md:text-[1.5rem] font-[600]">
          {candidates.length > 0 && candidates[0].state}
        </h1>
        <div className="w-full h-[70vh]  overflow-x-auto md:h-[600px]">
          <table className="w-full">
            <thead>
              <tr className="bg-[#fcb715]">
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px] ">
                  CONSTITUENCY
                </th>
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px]">
                  CANDIDATE
                </th>
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px]">
                  PARTY
                </th>
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px]">
                  VOTE
                </th>
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px]">
                  VOTE%
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div className="w-full h-full flex justify-center items-center absolute ">
                  <div className="absolute  top-16 left-0 right-0 mx-auto  ">
                    <Loading />
                  </div>
                </div>
              ) : (
                currentData.map((candidate, index) => (
                  <tr
                    key={index}
                    className={clsx({
                      "bg-[#ebebeb]": index % 2 == 0,
                      "bg-white": index % 2 != 0,
                    })}
                  >
                    <td className="text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {select_sabha === "Vidhan Sabha"
                        ? candidate.acName
                        : candidate.pcName}
                    </td>
                    <td className="w-[fit-content] text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {candidate.candidateName}
                    </td>
                    <td className="text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {candidate.party}
                    </td>
                    <td className="text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {candidate.votesCount}
                    </td>
                    <td className="text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {candidate.votePercentage?.toFixed(2)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalResults={totalResults}
        />
      </div>
    </div>
  );
}
