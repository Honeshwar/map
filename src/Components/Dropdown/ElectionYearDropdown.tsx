"use client";
import { useEffect, useState } from "react";
import { useFilterContextValue } from "../../context/FilterContext";
import clsx from "clsx";

export default function ElectionYearDropdown() {
  const {
    select_sabha,
    select_state,
    select_constituency,
    select_election_year,
    setSelect_election_year,
    select_compare_year,
    setSelect_compare_year,
    showElectionYearDropDown,
    setShowElectionYearDropDown,
    setShowConstituencyDropDown,
    setShowStateDropDown,
    resetFilterToInitial,
  } = useFilterContextValue();
  // console.log("select compare", select_compare_year);
  // const [showDropDown, setShowDropDown] = useState(false);
  const [showCompareDropDown, setShowCompareDropDown] = useState(false);

  const [years, setYears] = useState<number[]>([]);
  const [compareYears, setCompareYears] = useState<number[]>([]);
  const [currentSelectedYear, setCurrentSelectedYear] = useState<
    number | string
  >(select_election_year);

  useEffect(() => {
    //toggle sabha selection
    // if (
    //   select_state === "Select State" &&
    //   (select_sabha === "Lok Sabha"
    //     ? select_constituency.pcNo === -1
    //     : select_constituency.acNo === -1) &&
    //   currentSelectedYear === "Select Election year" &&
    //   select_compare_year.length === 0
    // ) {
    setCompareYears([]);
    setCurrentSelectedYear("Select Election year");
    // }
  }, [select_sabha]); //select_state, select_constituency

  useEffect(() => {
    const fetchYears = async () => {
      try {
        let urlEncodeStateName = encodeURIComponent(select_state);
        const response = await fetch(
          `https://dhruvresearch.com/api/v2/result/year?state=${urlEncodeStateName}&election_type=${
            select_sabha === "Vidhan Sabha" ? "VS" : "LS"
          }`
        );
        const responseData = await response.json();
        // console.log("result", responseData);
        setYears(responseData.data);
      } catch (error) {
        console.log("error in fetch years", error);
      }
    };
    if (select_state !== "Select State") {
      fetchYears();
    } else {
      setYears([]);
      setCompareYears([]);
      setCurrentSelectedYear("Select Election year");
    }
  }, [select_state]);
  useEffect(() => {
    const fetchYears = async () => {
      try {
        let urlEncodeStateName = encodeURIComponent(select_state);
        const response = await fetch(
          `https://dhruvresearch.com/api/v2/result/year?state=${urlEncodeStateName}&election_type=${
            select_sabha === "Vidhan Sabha" ? "VS" : "LS"
          }&constituency=${
            select_sabha === "Vidhan Sabha"
              ? select_constituency.acNo
              : select_constituency.pcNo
          }`
        );
        const responseData = await response.json();
        // console.log("result", responseData);
        setYears(responseData.data);
      } catch (error) {
        console.log("error in fetch years", error);
      }
    };
    if (
      (select_sabha === "Vidhan Sabha"
        ? select_constituency.acNo
        : select_constituency.pcNo) !== -1
    ) {
      fetchYears();
    } else {
      setYears([]);
      setCompareYears([]);
      setCurrentSelectedYear("Select Election year");
    }
  }, [select_constituency]);

  const handleSelectElectionYear = (ElectionYear: number) => {
    // resetFilterToInitial(1);
    // setSelect_election_year(ElectionYear);
    // setShowElectionYearDropDown(false);
    console.log("ElectionYear", ElectionYear);
    setCurrentSelectedYear(ElectionYear);
  };

  const handleSelectCompareYear = (compareYear: number) => {
    let newCompareYears = [...compareYears];
    if (compareYears.includes(compareYear)) {
      newCompareYears = compareYears.filter((year) => year !== compareYear);
    } else {
      newCompareYears.push(compareYear);
    }

    setCompareYears([...newCompareYears]);
  };
  return (
    <fieldset className="border-2 border-[#767575] rounded-md w-[250px] md:w-[200px] py-1 pb-[8px] relative">
      <legend className="text-[12px] text-gray-500 mx-2 px-1 relative">
        Election year <span className="text-[red]">*</span>
      </legend>
      <div
        className="w-[95%] px-2 text-gray-700 relative flex items-center"
        onClick={(e) => {
          e.stopPropagation();
          //reconcilation and batching
          setShowElectionYearDropDown((prev: boolean) => !prev);
          setShowStateDropDown(false);
          setShowConstituencyDropDown(false);
        }}
      >
        <span id="select-box-3 " className="text-sm">
          {" "}
          {currentSelectedYear}{" "}
        </span>
        <span className="text-[gray] absolute right-[0px]">
          <svg
            className="w-4"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32.000000 32.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
              fill="gray"
              stroke="none"
            >
              <path
                d="M50 197 c0 -18 92 -107 111 -107 18 0 109 90 109 108 0 23 -24 12
                    -67 -30 l-43 -42 -43 42 c-43 42 -67 53 -67 29z"
              />
            </g>
          </svg>
        </span>
      </div>

      {/* <!-- drop down --> */}
      {showElectionYearDropDown && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute z-[1] w-[200px] bg-white border-2 border-[#767575] rounded-lg   top-10 "
        >
          <ul
            id="dropdown-scroll"
            className="h-[200px] overflow-y-auto text-sm"
          >
            <li
              className={clsx(
                "py-2.5 pb-1  px-3 hover:text-black hover:bg-[#ffc400] select-option rounded-tl-lg ",
                {
                  "bg-[#ffc400] text-black":
                    currentSelectedYear === "Select Election year",
                  "bg-white text-[gray]":
                    currentSelectedYear !== "Select Election year",
                }
              )}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSelectedYear("Select Election year");
              }}
            >
              Select Election year
            </li>
            {years.map((year: number, index: number) => (
              <li
                key={"year-" + index}
                className={clsx(
                  "py-2  px-6 hover:text-black hover:bg-[#ffc400]",
                  {
                    "bg-[#ffc400] text-black": currentSelectedYear === year,
                    "bg-white text-[gray]": currentSelectedYear !== year,
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectElectionYear(year);
                }}
              >
                {year}
              </li>
            ))}
          </ul>
          <div
            className="text-[gray] px-3 pt-3 "
            style={{ boxShadow: "0 -2px 5px 1px rgb(204, 201, 201)" }}
          >
            <div className="pb-1 flex items-center gap-2 text-sm">
              Compare to
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentSelectedYear !== "Select Election year")
                    setShowCompareDropDown((prev) => !prev);
                }}
                className="border-2 py-1 pl-2 pr-1 text-black font-[500] rounded-md flex gap-1 items-center"
              >
                {/* <span>2018</span> */}
                {compareYears.length === 0 && (
                  <span
                    className={clsx("text-sm", {
                      "text-[gray]":
                        currentSelectedYear === "Select Election year",
                    })}
                  >
                    Select
                  </span>
                )}
                {compareYears.length > 0 && (
                  <span className="text-sm">{compareYears[0]}</span>
                )}
                <span className="text-[gray] ">
                  <svg
                    className="w-4"
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32.000000 32.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                      fill="gray"
                      stroke="none"
                    >
                      <path
                        d="M50 197 c0 -18 92 -107 111 -107 18 0 109 90 109 108 0 23 -24 12
                            -67 -30 l-43 -42 -43 42 c-43 42 -67 53 -67 29z"
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-5 pt-2 pb-3 text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // if (
                  //   select_state !== "Select State" &&
                  //   (select_sabha === "Lok Sabha"
                  //     ? select_constituency.pcNo !== -1
                  //     : select_constituency.acNo !== -1) &&
                  //   currentSelectedYear !== "Select Election year"
                  // )
                  // setSelect_compare_year([]);
                  // setSelect_election_year("Select Election year");
                  setCompareYears([]);
                  setCurrentSelectedYear("Select Election year");
                  setShowCompareDropDown(false);
                  //
                }}
              >
                Reset
              </button>
              <button
                className="text-black font-[500]"
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    select_state !== "Select State" &&
                    // (select_sabha === "Lok Sabha"
                    //   ? select_constituency.pcNo !== -1
                    //   : select_constituency.acNo !== -1) &&
                    currentSelectedYear !== "Select Election year"
                  ) {
                    setSelect_compare_year(compareYears);
                    setSelect_election_year(currentSelectedYear);
                    setShowElectionYearDropDown(false);
                  }
                }}
              >
                Apply
              </button>
            </div>
          </div>
          {/* <!-- compare dropdown --> */}
          {showCompareDropDown && (
            <div className=" absolute z-[1] w-[200px] bg-white border-2 border-[#767575] rounded-lg top-[102%] md:top-[32%] md:bottom-0 md:left-[205px] h-fit">
              <ul className="px-4 py-4 h-[200px] overflow-y-auto">
                {years.map(
                  (year: number, index: number) =>
                    currentSelectedYear !== year && (
                      <li
                        key={"compare-" + index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCompareYear(year);
                        }}
                        className={clsx(
                          " pt-2 hover:text-[yellow] hover:font-bold  flex gap-3 items-center text-sm font-semibold",
                          {
                            "compare-dropdown-select":
                              compareYears.includes(year),
                            "text-[gray]  ": !compareYears.includes(year),
                          }
                        )}
                      >
                        <div
                          className={clsx(
                            "w-4 h-4 border-2 border-[gray] flex justify-center items-center",
                            {}
                          )}
                        ></div>
                        <span> {year}</span>
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </fieldset>
  );
}
