"use client";
import React, { useEffect, useState } from "react";
import { useFilterContextValue } from "../../context/FilterContext";
import clsx from "clsx";
import { debouncing } from "@/utils/helper-function";
interface Constituency<T> {}
interface LS {
  pcNo: number;
  pcName: string;
}
interface VS {
  acNo: number;
  acName: string;
}

export default function ConstituencyDropdown() {
  const {
    select_sabha,
    select_state,
    select_constituency,
    setSelect_constituency,
    showConstituencyDropDown,
    setShowConstituencyDropDown,
    setShowStateDropDown,
    setShowElectionYearDropDown,
    resetFilterToInitial,
  } = useFilterContextValue();
  // const [showDropDown, setShowDropDown] = useState(false);
  const [currStateAllConstituency, setCurrStateAllConstituency] = useState([]);
  const [constituency, setConstituency] = useState([]);
  //console.log("state at constituency", select_state);
  useEffect(() => {
    const fetchConstituency = async () => {
      try {
        let urlEncodeStateName = encodeURIComponent(select_state);
        const response = await fetch(
          `https://dhruvresearch.com/api/v2/result/constituency?state=${urlEncodeStateName}&election_type=${
            select_sabha === "Vidhan Sabha" ? "VS" : "LS"
          }&limit=100`
        );
        const responseData = await response.json();
        //console.log("result", responseData);
        // setSelect_constituency(responseData.data);
        setCurrStateAllConstituency(responseData.data);
        setConstituency(responseData.data);
      } catch (error) {
        //console.log("error in fetch constituency", error);
      }
    };
    if (select_state !== "Select State") {
      fetchConstituency();
      setSearchText("");
    } else {
      setSelect_constituency(
        select_sabha === "Vidhan Sabha"
          ? {
              acNo: -1,
              acName: "Select AC",
            }
          : {
              pcNo: -1,
              pcName: "Select PC",
            }
      );
      setConstituency([]);
    }
  }, [select_state]);

  useEffect(() => {
    setSelect_constituency(
      select_sabha === "Vidhan Sabha"
        ? {
            acNo: -1,
            acName: "Select AC",
          }
        : {
            pcNo: -1,
            pcName: "Select PC",
          }
    );
  }, [select_sabha]);

  const handleSelectConstituency = (constituency: Constituency<LS | VS>) => {
    resetFilterToInitial(2);
    setSelect_constituency(constituency);
    setShowConstituencyDropDown(false);
  };

  // search feature for AC
  const [showSearchInput, setShowSearchInput] = useState(false);
  // const [searchValue, setSearchValue] = useState(select_sabha === "Vidhan Sabha" && select_constituency.acNo !== -1 ? select_constituency.acName : "");
  const [searchText, setSearchText] = useState(
    select_sabha === "Vidhan Sabha" && select_constituency.acNo !== -1
      ? select_constituency.acName
      : ""
  );
  const dbn = debouncing(searchAC, 350);
  useEffect(() => {
    dbn(searchText);
  }, [searchText]);
  useEffect(() => {
    if (select_sabha === "Vidhan Sabha" && select_constituency.acNo !== -1) {
      setSearchText(select_constituency.acName);
    }
  }, [select_constituency]);
  function searchAC(searchText: string = "") {
    console.log("searchText", searchText, typeof searchText);
    if (searchText === "") {
      setConstituency(currStateAllConstituency);
      return;
    }
    console.log("currStateAllConstituency", currStateAllConstituency);
    const newConstituency = currStateAllConstituency.filter((item: VS) => {
      // console.log(
      //   "item",
      //   item.acName.toLowerCase().includes(searchText.toLowerCase())
      // );
      return item.acName.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log("newConstituency", newConstituency);
    setConstituency(newConstituency);
  }
  return (
    <fieldset className="border-2 border-[#767575] rounded-md w-[250px] md:w-[200px] py-1 pb-[8px] relative">
      <legend className="text-[12px] text-gray-500 mx-2 px-1 relative">
        {select_sabha === "Vidhan Sabha" ? "AC" : "PC"}{" "}
        <span className="text-[red]">*</span>
      </legend>

      {showConstituencyDropDown &&
      showSearchInput &&
      select_sabha === "Vidhan Sabha" ? (
        <div className="flex justify-center items-center px-3">
          <input
            defaultValue={searchText}
            type="search"
            className="text-sm pb-1"
            style={{ outline: "none", borderBottom: "2px solid gray" }}
            placeholder="Search AC"
            onInput={(e: any) => {
              setSearchText(e.target.value);
              // dbn(e.target.value);
            }}
          />
        </div>
      ) : (
        <div
          className="w-[95%] px-2 text-gray-700 relative flex items-center"
          onClick={() => {
            //reconcilation and batching
            setShowElectionYearDropDown(false);
            setShowStateDropDown(false);
            setShowConstituencyDropDown((prev: boolean) => !prev);
            setShowSearchInput(true);
          }}
        >
          <span id="select-box-2" className="text-sm">
            {select_sabha === "Vidhan Sabha"
              ? select_constituency.acNo === -1
                ? `Select AC`
                : select_constituency.acName
              : select_constituency.pcNo === -1
              ? `Select PC`
              : select_constituency.pcName}
          </span>
          <span className="text-[gray] absolute right-[2px]">
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
      )}

      {/* <!-- drop down --> */}
      {showConstituencyDropDown && (
        <div className="absolute z-[1] w-[200px] bg-white border-2 border-[#767575] rounded-lg  pb-[2px] top-10 ">
          <ul
            id="dropdown-scroll"
            className="h-[200px] overflow-y-auto text-sm"
          >
            {select_sabha === "Vidhan Sabha" ? (
              <>
                <li
                  className={clsx(
                    "py-2.5 pb-1  px-6 hover:text-black hover:bg-[#ffc400] select-option rounded-tl-lg",
                    {
                      "bg-[#ffc400] text-black":
                        select_constituency.acNo === -1,
                      "bg-white text-[gray]": select_constituency.acNo !== -1,
                    }
                  )}
                  onClick={() =>
                    setSelect_constituency({
                      acNo: -1,
                      acName: "Select AC",
                    })
                  }
                >
                  Select AC
                </li>
                {constituency.map((constituency: VS, index) => (
                  <li
                    key={index}
                    className={clsx(
                      "py-2  px-6 hover:text-black hover:bg-[#ffc400]",
                      {
                        "bg-[#ffc400] text-black":
                          select_constituency.acNo === constituency.acNo,
                        "bg-white text-[gray]":
                          select_constituency.acNo !== constituency.acNo,
                      }
                    )}
                    onClick={() => handleSelectConstituency(constituency)}
                  >
                    {constituency.acName}
                  </li>
                ))}
                {constituency.length === 0 && (
                  <li className="text-center mt-5">No data found</li>
                )}
              </>
            ) : (
              <>
                <li
                  className={clsx(
                    "py-2.5 pb-1  px-6 hover:text-black hover:bg-[#ffc400] select-option rounded-tl-lg",
                    {
                      "bg-[#ffc400] text-black":
                        select_constituency.pcNo === -1,
                      "bg-white text-[gray]": select_constituency.pcNo !== -1,
                    }
                  )}
                  onClick={() => {
                    resetFilterToInitial(2);
                    setShowConstituencyDropDown(false);

                    setSelect_constituency({
                      pcNo: -1,
                      pcName: "Select PC",
                    });
                  }}
                >
                  Select PC
                </li>

                {constituency.map((constituency: LS, index) => (
                  <li
                    key={index}
                    className={clsx(
                      "py-2  px-6 hover:text-black hover:bg-[#ffc400]",
                      {
                        "bg-[#ffc400] text-black":
                          select_constituency.pcNo === constituency.pcNo,
                        "bg-white text-[gray]":
                          select_constituency.pcNo !== constituency.pcNo,
                      }
                    )}
                    onClick={() => handleSelectConstituency(constituency)}
                  >
                    {constituency.pcName}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      )}
    </fieldset>
  );
}
