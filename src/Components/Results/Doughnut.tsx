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
  //console.log("electionResult", electionResult);
  const { select_sabha } = useFilterContextValue();
  // //console.log("doughnut electionResult", electionResult);
  let labels = Object.keys(PARTY_ALLIANCE_COLORS);
  let backgroundColor = Object.values(PARTY_ALLIANCE_COLORS); //.slice(0,20)
  let doughnutData = [
    70, 10, 135, 60, 7, 70, 10, 135, 60, 7, 70, 10, 135, 60, 7, 70, 10, 135, 60,
    7,
  ];

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

  // max-w-[400px]
  return (
    <>
      {electionResult?.party?.length > 0 ? (
        <div className="w-full flex justify-center mx-auto max-h-fit relative    ">
          <Doughnut
            className={clsx(" w-fit mx-auto md:m-0  ", {
              "max-w-fit": electionResult?.party.length >= 10,
              "max-h-[200px]": electionResult?.party.length < 10,
            })}
            data={data}
            options={options}
          />{" "}
          <div
            className={clsx(
              "  absolute left-0 right-0 mx-auto top-[45%]  text-center",
              {
                "top-[52%] md:top-[54%]": electionResult?.party.length < 7,
                "top-[32%] md:top-[45%]": electionResult?.party.length >= 7,
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
