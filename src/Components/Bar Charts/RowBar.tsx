import { useEffect, useState } from "react";
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
import Loading from "../Loading";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function RowBar({
  title,
  labelArr,
  dataValues,
  totalBars,
  years,
  legends,
  colors,
}: // chartLoading,
{
  title: string;
  labelArr: string[];
  dataValues: {
    [key: string]: number[];
  }[];
  totalBars: number;
  years: number[];
  legends: string[];
  colors: string[];
  // chartLoading: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  const [select_party, setSelect_party] = useState<string[]>([]);
  const [new_dataValues, setNew_dataValues] = useState<any[]>(dataValues);
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

      //console.log("new data", newDatavalues, newLabels);
      setNew_dataValues(newDatavalues);
      setNew_labels(newLabels);
    }
  }, [select_party]);

  const labels = new_labels;
  // JSON.stringify(select_party) === "[]" ? labelArr : select_party;

  const datasets = [];
  let first = true;

  for (let i = 0; i < totalBars; i++) {
    // one stack having 8 bars
    let d1 = {
      label: legends[0],
      data: new_dataValues[i]["bar" + (i + 1)],
      backgroundColor: colors[0],
      stack: "stack-" + i, // Stack only the first two bars
      barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    };

    const d2 = {
      label: legends[1],
      data: new_dataValues[i]["bar" + (i + 2)],
      backgroundColor: colors[1],
      stack: "stack-" + i, // Stack only the first two bars
      barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    };

    let d3 = {
      label: legends[2],
      data: new_dataValues[i]["bar" + (i + 3)],
      backgroundColor: colors[2],
      stack: "stack-" + i, // Stack only the first two bars
      barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    };

    const d4 = {
      label: legends[3],
      data: new_dataValues[i]["bar" + (i + 4)],
      backgroundColor: colors[3],
      stack: "stack-" + i, // Stack only the first two bars
      barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    };

    let d5 = {
      label: legends[4],
      data: new_dataValues[i]["bar" + (i + 1)],
      backgroundColor: colors[4],
      stack: "stack-" + i, // Stack only the first two bars
      barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    };

    const d6 = {
      label: legends[5],
      data: new_dataValues[i]["bar" + (i + 2)],
      backgroundColor: colors[5],
      stack: "stack-" + i, // Stack only the first two bars
      barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    };

    let d7 = {
      label: legends[6],
      data: new_dataValues[i]["bar" + (i + 3)],
      backgroundColor: colors[6],
      stack: "stack-" + i, // Stack only the first two bars
      barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    };

    const d8 = {
      label: legends[7],
      data: new_dataValues[i]["bar" + (i + 4)],
      backgroundColor: colors[7],
      stack: "stack-" + i, // Stack only the first two bars
      barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    };
    datasets.push(d1, d2, d3, d4, d5, d6, d7, d8);
    first = !first;
  }

  const data = {
    labels: labels,
    datasets: datasets,
    // datasets: [
    //   {
    //     label: "Label1",
    //     data: dataValues[0].bar1,
    //     backgroundColor: "#317efc",
    //     stack: "first", // Stack only the first two bars
    //     barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40, //40->10
    //     // borderWidth: 1,
    //     // categoryPercentage: 0.6,
    //     // maxBarThickness: 70,
    //     // barPercentage: 1,
    //     // minBarThickness: 570,
    //   },
    //   {
    //     label: "Label2",
    //     data: dataValues[0].bar2,
    //     backgroundColor: "#ff80ad",
    //     stack: "first", // Stack only the first two bars
    //     barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40,
    //     // borderWidth: 1,
    //     // categoryPercentage: 0.6,
    //     // maxBarThickness: 70,
    //     // barPercentage: 1,
    //     // minBarThickness: 570,
    //   },
    //   {
    //     label: "Label3",
    //     data: dataValues[0].bar3,
    //     backgroundColor: "#317efc",
    //     stack: "first", // Stack only the first two bars
    //     barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40,
    //     // borderWidth: 1,
    //     // categoryPercentage: 0.6,
    //     // maxBarThickness: 70,
    //     // barPercentage: 1,
    //     // minBarThickness: 570,
    //   },
    //   {
    //     label: "Label4",
    //     data: dataValues[0].bar4,
    //     backgroundColor: "#ff80ad",
    //     stack: "first", // Stack only the first two bars
    //     barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40,
    //     // borderWidth: 1,
    //     // categoryPercentage: 0.6,
    //     // maxBarThickness: 70,
    //     // barPercentage: 1,
    //     // minBarThickness: 570,
    //   },
    //   {
    //     label: "Label5",
    //     data: dataValues[1].bar1,
    //     backgroundColor: "#ff80ad",
    //     stack: "last", // Stack only the last two bars
    //     barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40,
    //     // borderWidth: 1,
    //     // categoryPercentage: 0.6,
    //     // maxBarThickness: 70,
    //     // barPercentage: 1,
    //     // minBarThickness: 570,
    //   },
    //   {
    //     label: "Label6",
    //     data: dataValues[1].bar2,
    //     backgroundColor: "#317efc",
    //     stack: "last", // Stack only the last two bars
    //     barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40,
    //     // borderWidth: 1,
    //     // categoryPercentage: 0.6,
    //     // maxBarThickness: 70,
    //     // barPercentage: 1,
    //     // minBarThickness: 570,
    //   },
    //   {
    //     label: "Label7",
    //     data: dataValues[1].bar3,
    //     backgroundColor: "#ff80ad",
    //     stack: "last", // Stack only the last two bars
    //     barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40,
    //     // borderWidth: 1,
    //     // categoryPercentage: 0.6,
    //     // maxBarThickness: 70,
    //     // barPercentage: 1,
    //     // minBarThickness: 570,
    //   },
    //   {
    //     label: "Label8",
    //     data: dataValues[1].bar4,
    //     backgroundColor: "#317efc",
    //     stack: "last", // Stack only the last two bars
    //     barThickness: select_party.length === 1 ? 70 : isMobile ? 10 : 40,
    //     // borderWidth: 1,
    //     // categoryPercentage: 0.6,
    //     // maxBarThickness: 70,
    //     // barPercentage: 1,
    //     // minBarThickness: 570,
    //   },
    // ],
  };
  const options = {
    indexAxis: "y",
    // Display bars horizontally
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,

    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true, // Use point style for legend items
          boxWidth: 20, // Adjust box width to fit the circular markers
          padding: 30, //space two legends
          filter: function (legendItem: any, chartData: any) {
            // //console.log("java", legendItem, chartData);
            return title === "Income Based"
              ? legendItem.datasetIndex === 0 || // Keep only "Start"
                  legendItem.datasetIndex === 1 ||
                  legendItem.datasetIndex === 2 || // Keep only "Start"
                  legendItem.datasetIndex === 3 || // Keep only "End"
                  legendItem.datasetIndex === 4 || // Keep only "Start"
                  legendItem.datasetIndex === 5 ||
                  legendItem.datasetIndex === 6 || // Keep only "Start"
                  legendItem.datasetIndex === 7
              : legendItem.datasetIndex === 0 || // Keep only "Start"
                  legendItem.datasetIndex === 1 ||
                  legendItem.datasetIndex === 2 || // Keep only "Start"
                  legendItem.datasetIndex === 3 || // Keep only "End"
                  legendItem.datasetIndex === 4; // Keep only "Start"

            // return chartData.datasets.indexOf(legendItem.datasetIndex) > 1;
          },
        },
      },
      title: {
        display: true,
        // text: "Chart.js Bar Chart",
      },
    },
  } as any;

  const topLabels = {
    id: "topLabels", //@ts-ignore
    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        scales: { x, y },
      } = chart;
      //console.log("dsf", chart.data);
      for (let i = 0; i < years.length; i++) {
        //@ts-ignore
        chart.data.datasets[i * 7].data.forEach((datapoint, index) => {
          //to find sum of values of all datasets
          //   const datasetArray = [];
          // });
          // chart.data.datasets.forEach((dataset) => {
          //   datasetArray.push(dataset.data[index]);
          // });
          ctx.font = "bold 12px sans-serif";
          ctx.fillStyle = "#6688c0";
          ctx.textAlign = "center";
          title === "Income Based"
            ? ctx.fillText(
                years[i],
                // x.getPixelForValue(0),
                chart.getDatasetMeta(i * 7 + 7).data[index].x + 20,
                chart.getDatasetMeta(i * 7 + 7).data[index].y
              ) //i * 2 + 1 is the index of the dataset bar
            : ctx.fillText(
                years[i],
                // x.getPixelForValue(0),
                chart.getDatasetMeta(i * 4 + 4).data[index].x + 20,
                chart.getDatasetMeta(i * 4 + 4).data[index].y
              ); //i * 2 + 1 is the index of the dataset bar
        });
      }
    },
  };

  useEffect(() => {
    setSelect_party([]);
    setNew_dataValues(dataValues);
    setNew_labels(labelArr);
  }, [title, labelArr, dataValues, totalBars, years, legends, colors]);
  return (
    <div className="w-full mx-auto max-w-[1400px]  flex flex-col gap-8">
      {/* <h1 className="text-[2rem] font-bold text-[#d8ac00] text-center">
        Powered by: Dhruv Research
      </h1> */}
      <div className="w-full flex flex-col gap-4 md:gap-7 pb-8 relative">
        <h1 className="text-[.8rem] md:text-[1.2rem] font-[600]">{title}</h1>

        {/* barchart */}
        <div className="w-full overflow-y-auto">
          <FilterBtn
            party={labelArr}
            select_party={select_party}
            setSelect_party={setSelect_party}
            // setSelect_dataValues={setSelect_dataValues}
          />

          {isMobile ? (
            <div
              className="chart-container "
              style={{ height: "250px", width: "150%" }}
            >
              {/* {!chartLoading ? ( */}
              <Bar options={options} data={data} />
              {/* ) : (
                <Loading />
              )} */}
            </div>
          ) : (
            <div
              className="chart-container "
              style={{ height: "80%", width: "90%", margin: "0 auto" }}
            >
              {/* {!chartLoading ? ( */}
              <Bar plugins={[topLabels]} options={options} data={data} />
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
