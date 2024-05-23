import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useFilterContextValue } from "@/context/FilterContext";

//pagination logic move to pagination component and pass all data as props

// interface D {
//   party: string[];
//   seats: any;
// }
export default function Table({ data }: any) {
  function sortPartiesByFirstElement(parties: any) {
    // Convert the object into an array of entries (key-value pairs)
    const partiesArray = Object.entries(parties);
    // console.log("partiesArray: ", partiesArray);
    // Sort the array based on the first element of the array values
    partiesArray.sort((a: any, b: any) => {
      const aFirst = Array.isArray(a[1]) ? a[1][0] : a[1][0][0];
      const bFirst = Array.isArray(b[1]) ? b[1][0] : b[1][0][0];

      if (aFirst === undefined) return 1;
      if (bFirst === undefined) return -1;
      return aFirst - bFirst;
    });

    console.log("partiesArray: ", partiesArray);

    // Convert the array back to an object
    const sortedParties = Object.fromEntries(partiesArray);
    return sortedParties;
  }
  console.log("sorted data: ", sortPartiesByFirstElement(data.seats));
  // console.log("table component", data);
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
      setTotalPages(Math.ceil(data.party.length / (is_Mobile ? 5 : 10)));
      setIsMobile(is_Mobile);
    }
  }, [data]);
  const handlePageChange = (newPage: number) => {
    //circular, arrow works
    if (newPage < 1) newPage = totalPages;
    if (newPage > totalPages) newPage = 1;

    setCurrentData({
      seats: data.seats, //[10, 20],
      party: data.party.slice(
        (newPage - 1) * (isMobile ? 5 : 5),
        newPage * (isMobile ? 5 : 5)
      ), //["BJP", "INC"],
    }); // 5 entries per page
    console.log("current page: ", newPage);
    setCurrentPage(newPage);
  };
  return (
    <div className="w-[90%] mx-auto md:full h-fit   overflow-x-auto ">
      <table className="w-full border-2 border-[#b8b9bb] ">
        <caption id="table_1_caption" className="text-center   pb-3">
          {select_sabha === "Vidhan Sabha" ? "Assembly" : "Parliament"}{" "}
          {/* {JSON.stringify(data) === "{}" && "2023 v/s 2018 vs 2014"} */}
          {data?.year?.map((year: string, index: number) => (
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
            {data?.year?.map((year: string, index: number) => (
              <th
                className="text-[#0f3352] border-2 border-solid border-[#505050] p-[10px] text-center"
                key={index}
              >
                <span className="block">{year}</span>
                <span className="text-[#3a3a3a] font-[400]">Results</span>
              </th>
            ))}
            {/* {JSON.stringify(data) === "{}" && (
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

              {data.year.map((v: string, index: number) => (
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

          {/* {JSON.stringify(data) === "{}" && (
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
        totalResults={data?.party?.length}
      />
    </div>
  );
}
