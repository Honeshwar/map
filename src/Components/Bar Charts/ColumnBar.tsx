import { useEffect, useState, useRef } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartNotation from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import FilterBtn from "./FilterBtn";
// import faker from 'faker';
import "chartjs-plugin-datalabels";
import Loading from "../Loading";
// import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  // ChartDataLabels
  ChartNotation
);

export default function ColumnBar({
  title,
  labelArr,
  dataValues,
  totalBars,
  years,
  // chartLoading,
  chartNo,
  colors,
  legends,
}: {
  title: string;
  labelArr: string[];
  dataValues: {}[];
  totalBars: number;
  years: number[];
  // chartLoading: boolean;
  chartNo: number;
  colors: string[];
  legends: string[];
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  const [select_party, setSelect_party] = useState<string[]>([]);

  const [new_dataValues, setNew_dataValues] = useState<any>(dataValues);
  const [new_labels, setNew_labels] = useState<string[]>(labelArr);

  useEffect(() => {
    if (select_party.length === 0) {
      setNew_dataValues(dataValues);
      setNew_labels(labelArr);
    } else {
      let newLabels = [...select_party],
        newDatavalues = JSON.parse(JSON.stringify(dataValues));
      let indexOfParty: number[] = [];
      select_party.forEach((partyName) => {
        indexOfParty.push(labelArr.indexOf(partyName));
      });

      // newLabels.push(labelArr[partyIndex]);
      for (let obj of newDatavalues) {
        for (let key in obj) {
          obj[key] = obj[key].filter((v: number, i: number) =>
            indexOfParty.includes(i)
          );
        }
      }

      // //console.log("new data", newDatavalues, newLabels);
      setNew_dataValues(newDatavalues);
      setNew_labels(newLabels);
    }
  }, [select_party]);

  const labels = new_labels;
  // JSON.stringify(select_party) === "[]" ? labelArr : select_party;

  // const colors = ["#317efc", "#ff80ad"];
  // const barLabels = [
  //   "Illiterate",
  //   "8th Pass",
  //   "10th Pass",
  //   "12th Pass",
  //   "Graduation",
  //   "Post Graduation",
  // ];
  const datasets = [];
  let first = true;
  switch (chartNo) {
    case 1:
      for (let i = 0; i < years.length; i++) {
        console.log(dataValues, new_dataValues[i]);
        let d1 = {
          label: first ? legends[0] : legends[1],
          data: new_dataValues[i]["bar1"],
          backgroundColor: first ? colors[0] : colors[1],
          stack: "stack-" + (i + 1), // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6, // Adjust the space between bars
          // minBarThickness: 40,
          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        const d2 = {
          label: first ? legends[1] : legends[0],
          data: new_dataValues[i]["bar2"],
          backgroundColor: first ? colors[1] : colors[0],
          stack: "stack-" + (i + 1), // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6,

          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        datasets.push(d1, d2);
        first = !first;
      }
      break;
    case 2:
      for (let i = 0; i < years.length; i++) {
        let d1 = {
          label: first ? legends[0] : legends[5],
          data: new_dataValues[i]["bar1"],
          backgroundColor: first ? colors[0] : colors[5],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6, // Adjust the space between bars
          // minBarThickness: 40,
          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        const d2 = {
          label: first ? legends[1] : legends[4],
          data: new_dataValues[i]["bar2"],
          backgroundColor: first ? colors[1] : colors[4],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6,

          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        let d3 = {
          label: first ? legends[2] : legends[3],
          data: new_dataValues[i]["bar3"],
          backgroundColor: first ? colors[2] : colors[3],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6, // Adjust the space between bars
          // minBarThickness: 40,
          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        const d4 = {
          label: first ? legends[3] : legends[2],
          data: new_dataValues[i]["bar4"],
          backgroundColor: first ? colors[3] : colors[2],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6,

          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        const d5 = {
          label: first ? legends[4] : legends[1],
          data: new_dataValues[i]["bar5"],
          backgroundColor: first ? colors[4] : colors[1],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6,

          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        const d6 = {
          label: first ? legends[5] : legends[0],
          data: new_dataValues[i]["bar6"],
          backgroundColor: first ? colors[5] : colors[0],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6,

          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        datasets.push(d1, d2, d3, d4, d5, d6);
        first = !first;
      }
      break;

    case 3:
      for (let i = 0; i < years.length; i++) {
        let d1 = {
          label: first ? legends[0] : legends[3],
          data: new_dataValues[i]["bar1"],
          backgroundColor: first ? colors[0] : colors[3],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6, // Adjust the space between bars
          // minBarThickness: 40,
          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        const d2 = {
          label: first ? legends[1] : legends[2],
          data: new_dataValues[i]["bar2"],
          backgroundColor: first ? colors[1] : colors[2],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6,

          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        let d3 = {
          label: first ? legends[2] : legends[1],
          data: new_dataValues[i]["bar3"],
          backgroundColor: first ? colors[2] : colors[1],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6, // Adjust the space between bars
          // minBarThickness: 40,
          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        const d4 = {
          label: first ? legends[3] : legends[0],
          data: new_dataValues[i]["bar4"],
          backgroundColor: first ? colors[3] : colors[0],
          stack: "stack-" + i, // Stack only the first two bars
          borderWidth: 1,

          categoryPercentage: 0.6,

          maxBarThickness: 70,
          datalabels: {
            display: false,
          },
        };

        datasets.push(d1, d2, d3, d4);
        first = !first;
      }
      break;

    default:
    //console.log("No chartNo defined");
  }
  const data = {
    labels,
    datasets,
    // datasets: [
    //   // each object define single bar of different label data
    //   {
    //     label: "Male",
    //     data: dataValues.bar1,
    //     backgroundColor: "#317efc",
    //     stack: "first", // Stack only the first two bars
    //     borderWidth: 1,
    //     // barThickness: 50, // Set the bar width here
    //     // barPercentage: 1, // Adjust the width of each bar //only work both when barthickness not defines
    //     categoryPercentage: 0.6, // Adjust the space between bars
    //     // minBarThickness: 40,
    //     maxBarThickness: 70,
    //   },
    //   {
    //     label: "Female",
    //     data: dataValues.bar2,
    //     backgroundColor: "#ff80ad",
    //     stack: "first", // Stack only the first two bars
    //     borderWidth: 1,
    //     // barThickness: 50, // Set the bar width here
    //     // barPercentage: 1,
    //     categoryPercentage: 0.6,
    //     // minBarThickness: 40,
    //     maxBarThickness: 70,
    //     // datalabels: {
    //     //   display: true,
    //     //   color: "black",
    //     //   formatter: Math.round,
    //     //   anchor: "end",
    //     //   offset: -20,
    //     //   align: "start",
    //     // },
    //   },
    //   {
    //     label: "Female",
    //     data: dataValues.bar3,
    //     backgroundColor: "#ff80ad",
    //     stack: "second", // Stack only the second two bars
    //     borderWidth: 1,
    //     // barThickness: 50, // Set the bar width here
    //     // barPercentage: 1,
    //     categoryPercentage: 0.6,
    //     // minBarThickness: 40,
    //     maxBarThickness: 70,
    //     // datalabels: {
    //     //   display: true,
    //     //   color: "black",
    //     //   formatter: Math.round,
    //     //   anchor: "end",
    //     //   offset: -20,
    //     //   align: "start",
    //     // },
    //   },
    //   {
    //     label: "Male",
    //     data: dataValues.bar4,
    //     backgroundColor: "#317efc",
    //     stack: "second", // Stack only the second two bars
    //     borderWidth: 1,
    //     // barThickness: 50, // Set the bar width here
    //     // barPercentage: 1,
    //     categoryPercentage: 0.6,
    //     // minBarThickness: 40,
    //     maxBarThickness: 70,
    //   },
    // ],
  };

  // topLabels plugin block
  const topLabels = {
    id: "topLabels",
    //@ts-ignore
    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        scales: { x, y },
      } = chart;
      // //console.log("dsf", chart.data);
      for (let i = 0; i < years.length; i++) {
        switch (chartNo) {
          case 1:
            //console.log(
            //   "first",
            //   chart.data.datasets,
            //   chart.data.datasets[i * 2]
            // );
            //@ts-ignore
            chart.data.datasets[i * 2].data.forEach((datapoint, index) => {
              //to find sum of values of all datasets
              //   const datasetArray = [];
              // });
              // chart.data.datasets.forEach((dataset) => {
              //   datasetArray.push(dataset.data[index]);
              // });
              ctx.font = "bold 12px sans-serif";
              ctx.fillStyle = "#6688c0";
              ctx.textAlign = "center";
              //console.log("getdatasetmeta", chart.getDatasetMeta(i * 2 + 1));
              ctx.fillText(
                years[i],
                // x.getPixelForValue(0),
                chart.getDatasetMeta(i * 2 + 1).data[index].x,
                chart.getDatasetMeta(i * 2 + 1).data[index].y - 10
              );
            });
            break;
          case 2:
            // //console.log("first", chart.data.datasets[i * 6+5]);
            //@ts-ignore
            chart.data.datasets[i * 6 + 5].data.forEach((datapoint, index) => {
              ctx.font = "bold 12px sans-serif";
              ctx.fillStyle = "#6688c0";
              ctx.textAlign = "center";

              ctx.fillText(
                years[i],
                // x.getPixelForValue(0),
                chart.getDatasetMeta(i * 6 + 5).data[index].x,
                chart.getDatasetMeta(i * 6 + 5).data[index].y - 10
              );
            });
            break;
          case 3:
            // //console.log("first", chart.data.datasets[i * 4]);
            //@ts-ignore
            chart.data.datasets[i * 4 + 3].data.forEach((datapoint, index) => {
              ctx.font = "bold 12px sans-serif";
              ctx.fillStyle = "#6688c0";
              ctx.textAlign = "center";

              ctx.fillText(
                years[i],
                // x.getPixelForValue(0),
                chart.getDatasetMeta(i * 4 + 3).data[index].x,
                chart.getDatasetMeta(i * 4 + 3).data[index].y - 10
              ); //i*4 represent firest bar and +3 represent 4th bar in first stack , start from 0 index
            });
            break;
          default:
          //console.log("error");
        }
      }
    },
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: false,
        ticks: {
          callback: function (value: number) {
            return value + "%"; // Append "%" to the tick labels
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true, // Use point style for legend items
          // boxWidth: 20, // Adjust box width to fit the circular markers
          padding: 30, //space two legends
          filter: function (legendItem: any, chartData: any) {
            switch (chartNo) {
              case 1:
                return (
                  legendItem.datasetIndex === 0 || // Keep only "Start"
                  legendItem.datasetIndex === chartData.datasets.length - 2
                ); // Keep only "End"

              case 2:
                return (
                  legendItem.datasetIndex === 0 || // Keep only "Start"
                  legendItem.datasetIndex === 1 ||
                  legendItem.datasetIndex === 2 ||
                  legendItem.datasetIndex === 3 ||
                  legendItem.datasetIndex === 4 ||
                  legendItem.datasetIndex === 5
                ); // Keep only "End"
              case 3:
                return (
                  legendItem.datasetIndex === 0 || // Keep only "Start"
                  legendItem.datasetIndex === 1 ||
                  legendItem.datasetIndex === 2 ||
                  legendItem.datasetIndex === 3
                ); // Keep only "End"
              default:
              //console.log("default", legendItem.datasetIndex);
            }
          },
        },
      },
      title: {
        display: true,
        // text: "Chart.js Bar Chart",
      },

      stacks: {
        first: "Stack 1 Name",
        second: "Stack 2 Name",
        // Add more stack names if needed
      },
    },
    // plugins: [topLabels],
  } as any;

  useEffect(() => {
    setSelect_party([]);
    setNew_dataValues(dataValues);
    setNew_labels(labelArr);
  }, [title, labelArr, dataValues, totalBars, years]);
  return (
    <div className="w-full mx-auto max-w-[1400px]  flex flex-col gap-8">
      {/* <h1 className="text-[2rem] font-bold text-[#d8ac00] text-center">
        Powered by: Dhruv Research
      </h1> */}

      <div className="w-full flex flex-col gap-4 md:gap-7 pb-8 relative">
        <h1 className="text-[.8rem] md:text-[1.2rem] font-[600]">{title}</h1>

        {/* barchart */}
        <div className="overflow-x-auto">
          <FilterBtn
            select_party={select_party}
            setSelect_party={setSelect_party}
            party={labelArr}
          />
          {isMobile ? (
            <div
              className="chart-container "
              style={{ height: "250px", width: "500px" }}
            >
              {/* {!chartLoading ? ( */}
              <Bar
                plugins={[ChartDataLabels, topLabels]}
                options={options}
                data={data}
              />
              {/* ) : (
                <Loading />
              )} */}
            </div>
          ) : (
            <div
              className="chart-container relative"
              style={{ height: "70%", width: "90%", margin: "0 auto" }}
            >
              {/* {!chartLoading ? ( */}
              <Bar
                plugins={[ChartDataLabels, topLabels]}
                options={options}
                data={data}
              />
              {/* ) : (
                <Loading />
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
