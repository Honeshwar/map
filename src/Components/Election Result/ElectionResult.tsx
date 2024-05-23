// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";
import "./style.css";
import "./test.css";

// or only core styles
import "@splidejs/react-splide/css/core";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
const options = {
  type: "loop",
  perPage: 3,
  focus: "center",
  padding: { right: 60 },
  pagination: false,
  breakpoints: {
    1000: {
      perPage: 3,
    },
    768: {
      perPage: 1,
    },
    576: {
      perPage: 1,
    },
  },
  // breakpoints: {
  //   1000: { perPage: 3 },
  //   768: { perPage: 1 },
  //   576: { perPage: 1, gap: "1rem", padding: "30px" },
  // },
} as any;

interface InitialData {
  election_type: string;
  state: string;
  title: string;
  year: string;
}
export default function ElectionResult() {
  const splideRef = useRef<Splide>(null);
  const [selected_constituency, setSelected_constituency] =
    useState<InitialData>();
  const [initialData, setInitialData] = useState<InitialData[]>([]);
  useEffect(() => {
    const getAC_NAME = async () => {
      const res = await fetch("https://dhruvresearch.com/api/v2/home/initial");
      const resD = await res.json();
      console.log("resD", resD);
      setInitialData(resD.data);
      setSelected_constituency(resD.data[0]);

      let splideInstance = null;
      if (splideRef.current) {
        splideInstance = splideRef.current.splide;
      }
      console.log("splideInstance", splideRef);

      if (splideInstance) {
        const handleMove = (
          newIndex: number,
          prevIndex: number,
          destIndex: number
        ) => {
          console.log(`Moved from slide ${prevIndex} to slide ${newIndex}`);
          // Add your custom logic here
          // console.log(resD.data, newIndex, typeof newIndex);
          setSelected_constituency(resD.data[newIndex]);
        };

        splideInstance.on("move", handleMove);

        // Cleanup listener on unmount
        return () => {
          splideInstance.off("move", handleMove);
        };
      }
    };
    getAC_NAME();
  }, []);

  console.log(
    "selected_constituency",
    selected_constituency
    // initialData
  );

  // main content logic
  const [comparePollsters, setComparePollsters] = useState([]);
  useEffect(() => {
    const getComparePollster = async () => {
      const res = await fetch(
        "https://dhruvresearch.com/api/v2/home/exit-polls?state=" +
          selected_constituency?.state +
          "&year=" +
          selected_constituency?.year +
          "&election_type=" +
          selected_constituency?.election_type
      );
      const resD = await res.json();
      console.log("resD getComparePollster", resD);
      setComparePollsters(resD.data);
    };
    getComparePollster();
  }, []);
  return (
    <div className="">
      <div className="container px-md-5 px-0">
        <h4 className="head_election">Election Result</h4>
        {/* Assembly name slider */}
        <div className="h-28 ">
          <Splide
            ref={splideRef}
            options={options}
            id="elction_name"
            className={
              "splide elction_name_nav  w-full md:w-[80%] px-5 md:mx-auto   mt-5  "
            }
            role="group"
            aria-label="Splide Basic HTML Example"
            style={{ height: "102px" }}
          >
            {initialData.map((item: any, index) => (
              <SplideSlide
                key={item.state + "-" + index}
                className=" rounded-md h-28 flex justify-center items-center    "
              >
                <div
                  className={
                    "agenda_card  m-4  h-[90%] flex justify-center items-center"
                  }
                >
                  <div className="  px-4 text-center">
                    <h4 className="mb-0 py-1 text-xl font-bold">
                      {item.title}
                    </h4>
                  </div>
                </div>
                {/* <p
                  className={clsx("text-xl px-2 py-1 text-center rounded-lg", {
                    "bg-yellow-500": selected_constituency_name === item.title,
                  })}
                >
                  {item.title}
                </p> */}
              </SplideSlide>
            ))}
          </Splide>
        </div>

        {/* main content */}
        <div
          className="flex flex-wrap"
          style={{
            marginTop: "27px",
            background:
              "linear-gradient( 180deg,#fff7df 0%, #fffdf2 58.74%,#fff6da 113.54%) !important",

            backgroundColor: "#fde9a3 !important",
            width: "100%",
            border: " 0.5px solid #fc0",
          }}
        >
          {/* exit poll and compare pollster filter */}
          <div className="md:w-1/2 pr-4 pl-4  mt-6">
            <div className="flex">
              <p>
                <button
                  className="p-1 px-2"
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #ffe786",
                    background: "#fc0",
                    color: "#2c2300",
                    fontFamily: "sans-serif",
                    fontSize: "14px !important",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "160%",
                    letterSpacing: "0.56px",
                  }}
                >
                  EXIT POLL
                </button>
              </p>
              <p className="ms-4">
                <select
                  id="compare_election"
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #ffe786",
                    background: "#fc0",
                    color: "#2c2300",
                    fontFamily: "sans-serif",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "160%",
                    letterSpacing: "0.56px",
                    padding: "7px 10px",
                  }}
                >
                  <option>Compare Pollster</option>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                </select>
              </p>
            </div>

            <div className="flex flex-wrap">
              <div className="md:w-1/3 pr-4 pl-4 w-1/3">
                <div className="flex flex-wrap">
                  <div
                    className="md:w-full pr-4 pl-4 mt-4"
                    id="source_slider"
                  ></div>
                </div>
              </div>
              <div className="md:w-2/3 pr-4 pl-4 w-2/3 bg-white">
                <div>
                  <h5
                    id="survey_name"
                    className="p-1"
                    style={{
                      textAlign: "center",
                      color: "#4f4f4f",
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "normal",
                      letterSpacing: "0.64px",
                    }}
                  >
                    Dhruv Research
                  </h5>
                  <div className="p-1 pt-0 home_election">
                    <table className="table table-bordered">
                      <thead className="table">
                        <tr>
                          <td className="text-left">party</td>
                          <td className="text-center">seats</td>
                          <td className="text-center">seats</td>
                        </tr>
                      </thead>
                      <tbody id="table_value"></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* chart */}
          <div className="col-md-6 py-md-4 py-3">
            <div
              style={{
                borderLeft: "1px solid #e5e5e5 !important",
                width: "100%",
                height: "100%",
              }}
            >
              <a href="">
                <h6
                  className="pe-3"
                  style={{
                    color: "#1b60fc",
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "160%",
                    letterSpacing: "0.56px",
                    textDecorationLine: "underline",
                    textAlign: "right",
                  }}
                ></h6>
              </a>
              <div className="p-md-4 py-2 w-full relative">
                <canvas id="myChart"></canvas>
                <p id="center_text" className="center_text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div
          id="video-caraousal"
          className="splide m-auto p-0"
          role="group"
          aria-label="Splide Basic HTML Example"
        >
          <div className="splide__track">
            <ul className="splide__list" id="vidd"></ul>
          </div>
        </div>
      </div> */}
    </div>
  );
}
