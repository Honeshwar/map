import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useFilterContextValue } from "@/context/FilterContext";
import clsx from "clsx";

//pagination logic move to pagination component and pass all data as props

// interface DATA {
//   year: [],
//   seats: {},
//   party: [],
// }
export default function Table({
  data,
  sortPartiesBySeats,
}: {
  data: any;

  sortPartiesBySeats: (
    parties: string[],
    seats: { [key: string]: number[] },
    yearIndex: number,
    isAscendingSort?: boolean
  ) => string[];
}) {
  const [currTotalData, setCurrTotalData] = useState<any>(null);

  const bgColor = [
    "#b0b2ee",
    "#eff0f3",
    "#f8cfa1",
    "#d2f9c9",
    "#f8b4a6",
    "#b0b2ee",
    "#eff0f3",
    "#f8cfa1",
    "#d2f9c9",
    "#f8b4a6",
  ];
  const { select_sabha } = useFilterContextValue();
  // const [totalTableData, setTotalTableData] = useState(data); //{ year: ["2018", "2014"], seats: [10, 20] },parties: ["BJP", "INC"]};
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<any>({});
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const is_Mobile = window.innerWidth < 768;
    if (JSON.stringify(data) !== "{}") {
      setCurrentData({
        seats: data.seats, //[10, 20],
        party: data.party.slice(0, is_Mobile ? 5 : 5), //["BJP", "INC"],
      });
      setTotalPages(Math.ceil(data.party.length / 5)); //(is_Mobile ? 5 : 10)));
      setIsMobile(is_Mobile);

      setCurrTotalData(data);
    }
  }, [data]);
  const handlePageChange = (newPage: number) => {
    //circular, arrow works
    if (newPage < 1) newPage = totalPages;
    if (newPage > totalPages) newPage = 1;

    setCurrentData({
      seats: currTotalData.seats, //[10, 20],
      party: currTotalData.party.slice(
        (newPage - 1) * (isMobile ? 5 : 5),
        newPage * (isMobile ? 5 : 5)
      ), //["BJP", "INC"],
    }); // 5 entries per page
    // console.log("current page: ", newPage);
    setCurrentPage(newPage);
  };

  const [isSortByAsc, setIsSortByAsc] = useState(true);
  return (
    <div className="w-[90%] mx-auto md:full h-fit   overflow-x-auto ">
      <table className="w-full border-2 border-[#b8b9bb] ">
        <caption id="table_1_caption" className="text-center   pb-3">
          {select_sabha === "Vidhan Sabha" ? "Assembly" : "Parliament"}{" "}
          {/* {JSON.stringify(currTotalData) === "{}" && "2023 v/s 2018 vs 2014"} */}
          {currTotalData?.year?.map((year: string, index: number) => (
            <span key={index}>
              {index > 0 ? " v/s " : ""}
              {year}
            </span>
          ))}
        </caption>
        <thead>
          <tr style={{ backgroundColor: "#d1d5db" }}>
            {/* <th>hi</th>
            <th>hi</th> */}
            <th className="text-[#0f3352] border-2 border-solid border-[#505050] p-[5px] text-center">
              Party
            </th>
            {currTotalData?.year?.map((year: string, index: number) => (
              <th
                className="relative text-[#0f3352] border-2 border-solid border-[#505050] p-[10px] text-center"
                key={index}
              >
                <span className="block">{year}</span>
                <span className="text-[#3a3a3a] font-[400]">Results</span>
                <span className="absolute top-0 bottom-0 right-2 flex flex-col justify-center">
                  {/* decrease 3,2,1 */}

                  <svg
                    onClick={
                      isSortByAsc
                        ? () => {
                            const sortedParties = sortPartiesBySeats(
                              currTotalData.party,
                              currTotalData.seats,
                              // data.yearIndex,
                              index,
                              false
                            );
                            console.log("sortedParties", sortedParties);
                            setCurrTotalData({
                              ...currTotalData,
                              party: sortedParties,
                            });
                            setCurrentData({
                              seats: currTotalData.seats, //[10, 20],
                              party: sortedParties.slice(0, 5), //["BJP", "INC"],
                            });
                            setCurrentPage(1);
                            setIsSortByAsc(false);
                          }
                        : () => {}
                    }
                    className={clsx("w-6 h-6 hover:fill-red-500", {
                      "fill-red-500 ": !isSortByAsc,
                      "fill-red-400 cursor-pointer": isSortByAsc,
                    })}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* increase 1,2,3 */}

                  <svg
                    onClick={
                      !isSortByAsc
                        ? () => {
                            const sortedParties = sortPartiesBySeats(
                              currTotalData.party,
                              currTotalData.seats,
                              // data.yearIndex,
                              index,
                              true
                            );
                            console.log("sortedParties", sortedParties);
                            setCurrTotalData({
                              ...currTotalData,
                              party: sortedParties,
                            });
                            setCurrentData({
                              seats: currTotalData.seats, //[10, 20],
                              party: sortedParties.slice(0, 5), //["BJP", "INC"],
                            });
                            setCurrentPage(1);
                            setIsSortByAsc(true);
                          }
                        : () => {}
                    }
                    className={clsx("w-6 h-6 -mt-2 hover:fill-green-500  ", {
                      "fill-green-500 ": isSortByAsc,
                      "fill-green-400 cursor-pointer": !isSortByAsc,
                    })}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </th>
            ))}
            {/* {JSON.stringify(currTotalData) === "{}" && (
              <>
                <th className="text-[#0f3352] border-2 border-solid border-[#505050] p-[10px] text-center">
                  <span className="block">2023</span>
                  <span className="text-[#3a3a3a] font-[400]">Results</span>
                </th>
                <th className="text-[#0f3352] border-2 border-solid border-[#505050] p-[10px] text-center">
                  <span className="block">2018</span>
                  <span className="text-[#3a3a3a] font-[400]">Results</span>
                </th>
                <th className="text-[#0f3352] border-2 border-solid border-[#505050] p-[10px] text-center">
                  <span className="block">2014</span>
                  <span className="text-[#3a3a3a] font-[400]">Results</span>
                </th>
              </>
            )} */}
          </tr>
        </thead>
        <tbody id="table_1_body">
          {currentData?.party?.map((name: string, index: number) => (
            <tr style={{ backgroundColor: `${bgColor[index]}` }} key={index}>
              <th className="text-[#1f1f1f] border-2 border-solid border-[#505050] p-[10px] text-center">
                {name}
              </th>

              {currTotalData.year.map((v: string, index: number) => (
                <td
                  className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center"
                  key={index}
                >
                  {currentData.seats[name][index] !== undefined
                    ? currentData.seats[name][index]
                    : "NA"}
                </td>
              ))}
            </tr>
          ))}

          {/* {JSON.stringify(currTotalData) === "{}" && (
            <>
              <tr style={{ backgroundColor: "#b0b2ee" }}>
                <th className="text-[#1f1f1f] border-2 border-solid border-[#505050] p-[10px] text-center">
                  BTP
                </th>
                <td className=" text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  08
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  18
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  10
                </td>
              </tr>
              <tr style={{ backgroundColor: "#eff0f3" }}>
                <th className="text-[#1f1f1f] border-2 border-solid border-[#505050] p-[10px] text-center">
                  RLP
                </th>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  02
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  10
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  14
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f8cfa1" }}>
                <th className="text-[#1f1f1f] border-2 border-solid border-[#505050] p-[10px] text-center">
                  BJP
                </th>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  135
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  80
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  100
                </td>
              </tr>
              <tr style={{ backgroundColor: "#d2f9c9" }}>
                <th className="text-[#1f1f1f] border-2 border-solid border-[#505050] p-[10px] text-center">
                  INC
                </th>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  66
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  104
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  124
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f8b4a6" }}>
                <th className="text-[#1f1f1f] border-2 border-solid border-[#505050] p-[10px] text-center">
                  SP
                </th>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  20
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  40
                </td>
                <td className="text-[#1b1c1e] border-2 border-solid border-[#505050] p-[15px] text-center">
                  20
                </td>
              </tr>
            </>
          )} */}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalResults={currTotalData?.party?.length}
      />
    </div>
  );
}
