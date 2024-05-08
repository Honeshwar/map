import clsx from "clsx";
import { useState } from "react";

export default function FilterBtn({
  select_party,
  setSelect_party,
  party,
}: {
  select_party: string[];
  setSelect_party: any;
  party: string[];
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  // const party = ["BJP", "INC", "RLP", "BTP", "SP", "Others"];
  return (
    <>
      <div
        className="border-2 border-[gray] rounded-lg px-2 py-1 md:px-5 md:py-2 absolute right-0 -top-0 flex gap-[2px] md:gap-1 items-center"
        onClick={() => setShowDropDown((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // enable-background="new 0 0 24 24"
          viewBox="0 0 24 24"
          // fill="yellow"
          // width={30}
          // height={30}
          className="w-3 h-3 md:w-[30px] md:h-[30px]"
        >
          <path
            fill="#ffcc02"
            d="M10.9,21c-0.3,0-0.6-0.1-0.9-0.3c-0.4-0.3-0.7-0.8-0.7-1.3v-5.7L3.2,4.7C3,4.3,2.9,3.9,3.1,3.6C3.3,3.2,3.7,3,4.1,3h15.9c0.4,0,0.8,0.2,0.9,0.6c0.2,0.4,0.2,0.8-0.1,1.1l-6.2,8.7v5.2c0,0.7-0.4,1.3-1,1.5l-2.1,0.8C11.3,21,11.1,21,10.9,21z M6.1,5.1l5.1,7.6c0.2,0.3,0.3,0.6,0.3,0.9v5.1l1.1-0.4v-5c0-0.3,0.1-0.7,0.3-0.9l5.1-7.1H6.1z M9.4,13.9C9.4,13.9,9.4,13.9,9.4,13.9L9.4,13.9z"
          ></path>
        </svg>
        <span className="font-bold text-[.5rem] md:text-[14px]">
          Choose Party
        </span>
      </div>
      {/* <!-- compare dropdown --> */}
      {showDropDown && (
        <div
          className=" absolute z-[1] w-[170px] bg-white border-0 border-[#767575] rounded-lg  top-14 right-1 h-fit"
          style={{ boxShadow: "0 0 4px .5px gray" }}
        >
          <ul className="px-4 pt-2 h-[200px] overflow-y-auto">
            {party.map((name: string, index: number) => (
              <li
                key={index}
                onClick={() =>
                  setSelect_party((prev: string[]) => {
                    if (prev.includes(name)) {
                      return prev.filter((partyName) => name !== partyName);
                    }
                    return [name, ...prev];
                  })
                }
                className={clsx(
                  " pt-2 hover:text-[#ffcc02] hover:font-bold  flex gap-3 items-center font-semibold text-sm",
                  {
                    "compare-dropdown-select": select_party.includes(name),
                    "text-[gray] font-semibold": !select_party.includes(name),
                  }
                )}
              >
                <div
                  className={clsx(
                    "w-4 h-4 border-2 border-[gray] flex justify-center items-center ",
                    {}
                  )}
                ></div>
                <span> {name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
