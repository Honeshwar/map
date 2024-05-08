const ROW1 = {
  title: "Income Based",
  labelArr: ["BJP", "INC", "RLP", "BTP", "SP", "Others"],
  totalBars: 2,
  years: [2018, 2022],
  dataValues: [
    // ?year2018
    {
      bar1: [1010, 2010, 3010, 2010, 1010, 4010],
      bar2: [1510, 2510, 3510, 4510, 5510, 4110],
      bar3: [1010, 2010, 3010, 2010, 1010, 4210],
      bar4: [1510, 2510, 3510, 4510, 5510, 3010],
    },
    // year2022
    {
      bar1: [1510, 1510, 2510, 5510, 2510, 3110],
      bar2: [3010, 4010, 6010, 8010, 9010, 3210],
      bar3: [1510, 1510, 2510, 5510, 2510, 3310],
      bar4: [3010, 4010, 6010, 8010, 9010, 3410],
    },
  ],
  legends: [
    "Less than 5k",
    "5k to 10k",
    "10k to 20k",
    "20k to 30k",
    "30k to 50k",
    "50k to 80k",
    "80k to 150k",
    "150k++",
  ],

  colors: [
    "#ffb573",
    "#317efc",
    "#9ec8ff",
    "#ed8918",
    "#0ee",
    "#ed8918",
    "#b4e",
    "#ed8ee8",
  ],
};

const ROW2 = {
  title: "Income Based",
  labelArr: ["BJP", "INC", "RLP", "BTP", "SP", "Others"],
  totalBars: 2,
  years: [2018, 2022],
  dataValues: [
    // ?year2018
    {
      bar1: [1010, 2010, 3010, 2010, 1010, 4010],
      bar2: [1510, 2510, 3510, 4510, 5510, 4110],
      bar3: [1010, 2010, 3010, 2010, 1010, 4210],
      bar4: [1510, 2510, 3510, 4510, 5510, 3010],
    },
    // year2022
    {
      bar1: [1510, 1510, 2510, 5510, 2510, 3110],
      bar2: [3010, 4010, 6010, 8010, 9010, 3210],
      bar3: [1510, 1510, 2510, 5510, 2510, 3310],
      bar4: [3010, 4010, 6010, 8010, 9010, 3410],
    },
  ],
  legends: ["18-23", "24-35", "36-50", "51-60", "60++"],
  colors: ["#ffb469", "#ffe0c1", "#ffdc69", "#5da8ff"],
};
const COLUMN1 = {
  title: "VOTER SHARE STATS",
  dataValues: [
    //year 2018
    {
      bar1: [10, 20, 30, 20, 10, 50],
      bar2: [25, 25, 35, 45, 55, 61],
    },
    //year 2022
    {
      bar1: [15, 15, 25, 55, 25, 42],
      bar2: [30, 40, 60, 80, 90, 83],
    },
  ],
  totalBars: 4,
  labelArr: ["BJP", "INC", "RLP", "BTP", "SP", "Others"],
  years: [2018, 2022],
  colors: ["#317efc", "#ff80ad"],
  legends: ["Male", "Female"],
};
const COLUMN2 = {
  title: "Education wise voter share",
  dataValues: [
    {
      bar1: [10, 11, 12, 13, 14, 15],
      bar2: [20, 21, 22, 23, 24, 25],
      bar3: [30, 31, 32, 33, 34, 35],
      bar4: [40, 41, 42, 43, 44, 45],
      bar5: [50, 51, 52, 53, 54, 55],
      bar6: [60, 61, 62, 63, 64, 65],
    },
    {
      bar1: [10, 11, 12, 13, 14, 15],
      bar2: [20, 21, 22, 23, 24, 25],
      bar3: [30, 31, 32, 33, 34, 35],
      bar4: [40, 41, 42, 43, 44, 45],
      bar5: [50, 51, 52, 53, 54, 55],
      bar6: [60, 61, 62, 63, 64, 65],
    },
  ],
  totalBars: 4,
  labelArr: ["BJP", "INC", "RLP", "BTP", "SP", "Others"],
  years: [2018, 2022],
  colors: ["#ffb573", "#317efc", "#9ec8ff", "#ed8918", "#ff8918", "#ed8ee8"],
  legends: [
    "Illiterate",
    "8th Pass",
    "10th Pass",
    "12th Pass",
    "Graduation",
    "Post Graduation",
  ],
};
const COLUMN3 = {
  title: "Category wise voter share",
  dataValues: [
    {
      bar1: [10, 11, 12, 13, 14, 15],
      bar2: [20, 21, 22, 23, 24, 25],
      bar3: [30, 31, 32, 33, 34, 35],
      bar4: [40, 41, 42, 43, 44, 45],
    },
    {
      bar1: [10, 11, 12, 13, 14, 15],
      bar2: [20, 21, 22, 23, 24, 25],
      bar3: [30, 31, 32, 33, 34, 35],
      bar4: [40, 41, 42, 43, 44, 45],
    },
  ],
  totalBars: 4,
  labelArr: ["BJP", "INC", "RLP", "BTP", "SP", "Others"],
  years: [2018, 2022],
  colors: ["#ffb573", "#317efc", "#9ec8ff", "#ed8918"],
  legends: ["General", "OBC", "SC", "ST"],
};
export { ROW1, ROW2, COLUMN1, COLUMN2, COLUMN3 };
