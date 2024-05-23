// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";
import "./style.css";
import "./test.css";

// or only core styles
import "@splidejs/react-splide/css/core";
import { useEffect, useRef, useState } from "react";
const options = {
  type: "loop",
  drag: false,
  perPage: 3,
  perMove: 1,
  autoplay: false,
  // interval: 3000,
  focus: "center",
  pagination: false,
  arrows: true,
  breakpoints: {
    1000: { perPage: 3 },
    768: { perPage: 1 },
    576: { perPage: 1, gap: "1rem", padding: "30px" },
  },
  // Register the onMoved event handler
  onMoved: () => {}, // handleSlideChange,
} as any;
export default function ElectionResult() {
  const splideRef = useRef<Splide>(null);
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    const getAC_NAME = async () => {
      const res = await fetch("https://dhruvresearch.com/api/v2/home/initial");
      const resD = await res.json();
      console.log("resD", resD);
      setInitialData(resD.data);
    };
    getAC_NAME();
  }, []);
  return (
    <div className="">
      <div className="container px-md-5 px-0">
        <h4 className="text-black text-center font-[Poppins] text-[48px] leading-normal uppercase mt-[2%] font-semibold">
          Election Result
        </h4>
        {/* Assembly name slider */}

        <div className="w-full ">
          <Splide
            options={options}
            id="elction_name"
            className="splide elction_name_nav m-auto mx-5 px-5 bg-black"
            role="group"
            aria-label="Splide Basic HTML Example"
          >
            {initialData.map((item: any, index) => (
              <SplideSlide
                key={item.state + "-" + index}
                className=" h-28 flex justify-center items-center "
              >
                <p className="text-xl">{item.title}</p>
              </SplideSlide>
            ))}
          </Splide>
        </div>
        {/* <div
          id="elction_name"
          className="splide elction_name_nav m-auto mx-5 px-5 bg-black"
          role="group"
          aria-label="Splide Basic HTML Example"
        >
          <div className="splide__track">
            <ul id="election" className="splide__list"></ul>
          </div>
        </div> */}
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
/** <div
          className="row"
          style={{
            marginTop: "27px",
            background:
              "linear-gradient( 180deg,              #fff7df 0%,              #fffdf2 58.74%,              #fff6da 113.54%            ) !important",
          
            backgroundColor: "#fde9a3 !important",
            width: "100%",
            border: " 0.5px solid #fc0",
          }}
        >
          <div className="col-md-6 mt-[30px]">
            <div className="flex">
              <p>
                <button
                  className="p-1"
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #ffe786",
                    background: "#fc0",
                    color: "#2c2300",
                    fontFamily: "Roboto",
                    fontSize: "14px",
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
                  className="p-1"
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #ffe786",
                    background: "#fc0",
                    color: "#2c2300",
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "160%" ,
                    letterSpacing: "0.56px",
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

            <div className="row">
              <div className="col-md-4 col-4">
                <div className="row">
                  <div className="col-md-12 mt-4" id="source_slider"></div>
                </div>
              </div>
              <div className="col-md-8 col-8 bg-white">
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
                      <tbody id="table_value">
                     
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
         */
