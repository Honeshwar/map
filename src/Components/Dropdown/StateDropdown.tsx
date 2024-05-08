import { useEffect, useState } from "react";
import { useFilterContextValue } from "../../context/FilterContext";
import clsx from "clsx";
import dotenv from "dotenv";
// console.log("NEXT_PUBLIC_API_URL AT SERVER: ", process.env.NEXT_PUBLIC_API_URL);
export default function StateDropdown() {
  // console.log(
  //   "NEXT_PUBLIC_API_URL AT CLIENT: ",
  //   process.env.NEXT_PUBLIC_API_URL
  // ); //${process.env.API_URL}
  const {
    select_state,
    setSelect_state,
    showStateDropDown,
    setShowStateDropDown,
    setShowConstituencyDropDown,
    setShowElectionYearDropDown,
    resetFilterToInitial,
    select_sabha,
  } = useFilterContextValue();
  // const [showDropDown, setShowDropDown] = useState(false);
  const [states, setStates] = useState([]);
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://dhruvresearch.com/api/v2/result/state?election_type=${
            select_sabha === "Vidhan Sabha" ? "VS" : "LS"
          }`
        );
        const responseData = await response.json();
        console.log("response state", responseData);
        setStates(responseData.data);
      } catch (error) {
        console.log("error in fetch states", error);
      }
    };

    fetchStates();
  }, [select_sabha]);

  const handleSelectState = (name: string) => {
    resetFilterToInitial(3);
    setSelect_state(name);
    setShowStateDropDown(false);
  };
  return (
    <fieldset className="border-2 border-[#767575] rounded-md w-[250px] md:w-[200px] py-1 pb-[8px] relative">
      <legend className="text-[12px] text-gray-500 mx-2 px-1 relative  ">
        State <span className="text-[red]">*</span>
      </legend>
      <div
        className="w-[95%] px-2 text-gray-700 relative flex items-center"
        onClick={() => {
          setShowConstituencyDropDown(false); //reconcilation and batching
          setShowElectionYearDropDown(false);
          setShowStateDropDown((prev: boolean) => !prev);
        }}
      >
        <span id="select-box-1  " className="text-sm">
          {" "}
          {select_state === "Select State"
            ? `Select State ${select_sabha === "Vidhan Sabha" ? "" : "& UTs"}`
            : select_state}{" "}
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

      {/* <!-- drop down --> */}
      {showStateDropDown && (
        <div className="absolute z-[1] w-[200px] h-fit bg-white border-2 border-[#767575] rounded-lg  pb-[2px] top-10 ">
          <ul
            id="dropdown-scroll"
            className="h-[200px] w-full overflow-y-auto text-sm"
          >
            <li
              className={clsx(
                "py-2.5 pb-1  px-6 hover:text-black hover:bg-[#ffc400] select-option rounded-tl-lg ",
                {
                  "bg-[#ffc400] text-black": select_state === "Select State",
                  "bg-white text-[gray]": select_state !== "Select State",
                }
              )}
              onClick={() => setSelect_state("Select State")}
            >
              Select State {select_sabha === "Vidhan Sabha" ? "" : "& UTs"}
            </li>
            {states?.map((state, index) => (
              <li
                key={index}
                className={clsx(
                  "py-2  px-6 hover:text-black hover:bg-[#ffc400]",
                  {
                    "bg-[#ffc400] text-black": select_state === state,
                    "bg-white text-[gray]": select_state !== state,
                  }
                )}
                onClick={() => handleSelectState(state)}
              >
                {state}
              </li>
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  );
}
