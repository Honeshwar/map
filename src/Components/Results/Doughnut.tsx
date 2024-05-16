import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import clsx from "clsx";
ChartJS.register(ArcElement, Tooltip, Legend);
import { PARTY_ALLIANCE_COLORS } from "@/utils/constants";
import { useFilterContextValue } from "@/context/FilterContext";

const DoughnutChart = ({
  electionResult,
  totalSeats,
}: {
  electionResult: {
    seats: number[];
    party: string[];
  };
  totalSeats: number;
}) => {
  const windowWidth = window.innerWidth;
  //console.log("electionResult", electionResult);
  const { select_sabha } = useFilterContextValue();
  // //console.log("doughnut electionResult", electionResult);
  let labels = Object.keys(PARTY_ALLIANCE_COLORS).slice(0, 30);
  let backgroundColor = Object.values(PARTY_ALLIANCE_COLORS); //.slice(0,20)
  let doughnutData = [
    70, 10, 135, 60, 7, 70, 10, 135, 60, 7, 70, 10, 135, 60, 7, 70, 10, 135, 60,
    // 70, 10, 135, 60, 7, 70, 10, 135, 60, 7, 70, 10, 135, 60, 7, 70, 10, 135, 60,
    // 7,
  ];
  // labels = [];
  // backgroundColor = [];
  // doughnutData = [];

  if (electionResult?.party?.length > 0) {
    labels = electionResult.party;
    doughnutData = electionResult.seats;
    //console.log("labels", labels);
    backgroundColor = [];
    labels.forEach((partyName) => {
      //@ts-ignore
      backgroundColor.push(PARTY_ALLIANCE_COLORS[partyName]);
    });
  }
  //console.log("defaultColor", backgroundColor, labels);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Seats",
        data: doughnutData,
        backgroundColor: backgroundColor,
        Color: [
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
        ],
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    aspectRatio: 2,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: "bottom",
      },
      // datalabels: {
      //   display: true,
      // },
    },
  } as any;

  const CenterLabelPlugin = {
    id: "centerLabel",
    beforeDraw: (chart: any) => {
      if (chart.config.type !== "doughnut") {
        return;
      }

      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;

      console.log("wefsad", width, height);
      ctx.restore();
      const fontSize = (height / 130).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.fillStyle = "gray";
      ctx.textBaseline = "middle";

      const text = "543";
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const position = Math.ceil(labels.length / 7);
      const textY =
        windowWidth < 768
          ? height / 2 + (20 - (position - 1) * 15)
          : height / 2 + (40 - (position - 1) * 8);
      //[]20,5,- 10;

      console.log(fontSize, textX, textY);
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  // max-w-[400px]
  return (
    <>
      {electionResult?.party?.length > 0 ? (
        <div className="w-full flex justify-center mx-auto max-h-fit relative px-0  md:px-20 ">
          <Doughnut
            // plugins={[CenterLabelPlugin]}
            className={clsx(" w-[380px] mx-auto md:m-0 h-fit ", {})}
            data={data}
            options={options}
          />{" "}
          <div
            className={clsx(
              "  absolute left-0 right-0 mx-auto top-[45%]  text-center",
              {
                "top-[52%] md:top-[65%]": electionResult?.party.length <= 6,
                // "top-[32%] md:top-[45%]": electionResult?.party.length >= 7,
                "top-[31%] md:top-[55%]":
                  electionResult?.party.length >= 7 &&
                  electionResult?.party.length <= 20,
                "top-[31%] md:top-[45%]":
                  electionResult?.party.length >= 21 &&
                  electionResult?.party.length <= 30,
                "top-[31%] md:top-[35%]":
                  electionResult?.party.length >= 31 &&
                  electionResult?.party.length <= 40,

                "top-[31%] md:top-[25%]":
                  electionResult?.party.length >= 41 &&
                  electionResult?.party.length <= 50,
                "top-[31%] md:top-[15%]":
                  electionResult?.party.length >= 51 &&
                  electionResult?.party.length <= 60,
                "top-[31%] md:top-[5%]":
                  electionResult?.party.length >= 61 &&
                  electionResult?.party.length <= 70,

                // &&
                // select_sabha === "Lok Sabha",
              }
            )}
          >
            <span
              className="text-md sm:text-3xl font-bold"
              style={{
                color: "gray",
              }}
            >
              {totalSeats === 0 ? "" : totalSeats}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 font-extrabold"> No data</p>
      )}
    </>
  );
};

export default DoughnutChart;
