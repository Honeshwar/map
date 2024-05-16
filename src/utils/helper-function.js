function formateData(data) {
  let convertedData = {};

  for (let year in data) {
    let yearData = data[year];
    convertedData[year] = {
      GENDER: {
        // Male: {},
        // Female: {},
      },
      CATEGORY: {
        // General: {},
        // OBC: {},
        // SC: {},
        // ST: {},
      },
      INCOME: {
        // "IG-1": {},
        // "IG-2": {},
        // "IG-3": {},
        // "IG-4": {},
        // "IG-5": {},
        // "IG-6": {},
        // "IG-7": {},
      },
      EDUCATION: {
        // Illiterate: {},
        // "8th": {},
        // "10th": {},
        // "12th": {},
        // Grad: {},
        // PostGrad: {},
      },
      AGE: {
        // "AG-1": {},
        // "AG-2": {},
        // "AG-3": {},
        // "AG-4": {},
        // "AG-5": {},
      },
    };

    for (let category in yearData) {
      let categoryData = yearData[category];
      if (category === "Male" || category === "Female") {
        convertedData[year]["GENDER"][category] = categoryData;
      } else if (["General", "OBC", "SC", "ST"].includes(category)) {
        convertedData[year]["CATEGORY"][category] = categoryData;
      } else if (category.startsWith("IG-")) {
        convertedData[year]["INCOME"][category] = categoryData;
      } else if (
        ["Illiterate", "8th", "10th", "12th", "Grad", "PostGrad"].includes(
          category
        )
      ) {
        convertedData[year]["EDUCATION"][category] = categoryData;
      } else if (category.startsWith("AG-")) {
        convertedData[year]["AGE"][category] = categoryData;
      }
    }
  }

  return convertedData;
}
// const categories = ["GENDER", "CATEGORY",  "EDUCATION", "INCOME","AGE"];
function convertColumnData(data, category) {
  const dataValues = {};
  const labelArr = [];
  const years = Object.keys(data);
  let totalBars = 0;

  // Loop through each year
  years.forEach((year, index) => {
    // categories.forEach((category) => {
    const genders = Object.keys(data[year][category]);
    genders.forEach((gender) => {
      const parties = Object.keys(data[year][category][gender]);
      parties.forEach((party) => {
        if (!labelArr.includes(party)) {
          labelArr.push(party);
        }
        const key = `bar${index + 1}`;
        if (!dataValues[key]) {
          dataValues[key] = new Array(labelArr.length).fill(0);
        }
        const partyIndex = labelArr.indexOf(party);
        dataValues[key][partyIndex] = data[year][category][gender][party];
      });
    });
    // });
  });

  totalBars = years.length * 2;
  //   equally fill the array
  for (let key in dataValues) {
    let arr = new Array(labelArr.length).fill(0);
    for (let index = 0; index < dataValues[key].length; index++) {
      arr[index] = dataValues[key][index];
    }
    dataValues[key] = arr;
  }
  return { dataValues, totalBars, labelArr, years: years.map(Number) };
}

function convertRowData(data, category) {
  const dataValues = [];
  const labelArr = [];
  data = sortIncomeByKey(data, category);
  //console.log(data);
  const years = Object.keys(data);
  let totalBars = 0;

  // Loop through each year
  years.forEach((year, index) => {
    // categories.forEach((category) => {
    const keys = Object.keys(data[year][category]);
    // if (!checkForExistingKey(keys.length, category)) {
    //   return false;
    // }
    keys.forEach((key, i) => {
      const parties = Object.keys(data[year][category][key]);
      parties.forEach((party) => {
        if (!labelArr.includes(party)) {
          labelArr.push(party);
        }
        const barName = `bar${i + 1}`;
        if (!dataValues[index]) {
          //console.log("{}kjn");
          dataValues[index] = {};
        }
        if (!dataValues[index][barName]) {
          dataValues[index][barName] = new Array(labelArr.length).fill(0);
        }
        const partyIndex = labelArr.indexOf(party);
        //console.log(index, i, barName, party);
        dataValues[index][barName][partyIndex] =
          data[year][category][key][party];
      });
    });
    // });
  });

  totalBars = years.length;
  //   equally fill the array
  for (let index = 0; index < dataValues.length; index++) {
    for (let k in dataValues[index]) {
      if (dataValues[index][k].length !== labelArr.length) {
        let arr = new Array(labelArr.length).fill(0);
        for (let i = 0; i < dataValues.length; i++) {
          arr[i] = dataValues[index][k][i];
          if (dataValues[index][k][i] === undefined) {
            arr[i] = 0;
          }
        }
        dataValues[index][k] = arr;
      }
    }
  }
  return { dataValues, totalBars, labelArr, years: years.map(Number) };
}

// Example usage:
export const data = {
  2022: {
    Male: {
      INC: 275,
      BJP: 1,
    },
    Grad: {
      BJP: 1,
      INC: 0,
    },
    Illiterate: {
      INC: 33.333333333333336,
    },
    PostGrad: {
      INC: 0,
    },
    "IG-5": {
      INC: 0,
    },
    "IG-1": {
      BJP: 5,
    },
    "AG-5": {
      BJP: 3.3333333333333335,
      INC: 0,
    },
    SC: {
      INC: 2.75,
      BJP: 1,
    },
    Female: {
      BJP: 0,
      INC: 1,
    },
    "IG-4": {
      BJP: 3.6666666666666665,
      INC: 0,
    },
    "IG-2": {
      BJP: 27.75,
    },
    "IG-3": {
      BJP: 0,
      INC: 0,
    },
    "IG-6": {
      BJP: 0,
      INC: 1,
    },
    "AG-4": {
      BJP: 0,
      INC: 5,
    },
    "12th": {
      BJP: 33.333333333333336,
      INC: 1,
    },
    "AG-2": {
      INC: 0,
      BJP: 0,
    },
    ST: {
      BJP: 0,
      INC: 1,
    },
    "IG-7": {
      INC: 2.75,
    },
    "10th": {
      BJP: 0,
      INC: 0,
    },
    OBC: {
      INC: 0,
    },
    General: {
      BJP: 0,
    },
    "8th": {
      INC: 1,
    },
  },
  2023: {
    Illiterate: {
      INC: 967,
      BJP: 33.333333333333336,
    },
    "10th": {
      SS: 55,
      BJP: 1,
    },
    Grad: {
      INC: 45,
      BJP: 0,
    },
    "IG-1": {
      SS: 34,
      BJP: 0,
    },
    "IG-3": {
      INC: 13777.5,
      BJP: 1,
    },
    "IG-5": {
      SS: 58,
      INC: 5.5,
      BJP: 0,
    },
    "IG-7": {
      INC: 1203.3333333333333,
    },
    "AG-2": {
      SS: 53,
      BJP: 0,
      INC: 0,
    },
    "AG-4": {
      INC: 84000.2,
      BJP: 0,
    },
    Male: {
      SS: 59,
      BJP: 0.5,
      INC: 1,
    },
    "12th": {
      BJP: 33.333333333333336,
      INC: 37,
    },
    "8th": {
      BJP: 2.75,
      INC: 2,
    },
    OBC: {
      BJP: 0,
      INC: 0,
    },
    "AG-5": {
      INC: 5,
    },
    SC: {
      BJP: 1,
      INC: 0.5,
    },
    "IG-6": {
      INC: 0,
      BJP: 1,
    },
    General: {
      INC: 1,
      BJP: 0,
    },
    Female: {
      INC: 0.5,
    },
    "AG-3": {
      BJP: 33.666666666666664,
    },
    "IG-2": {
      BJP: 3.3333333333333335,
    },
    PostGrad: {
      INC: 3.3333333333333335,
    },
    ST: {
      BJP: 0,
    },
    "IG-4": {
      INC: 0.5,
    },
  },
};
// const result = convertData(data);
// //console.log(result);
function sortIncomeByKey(data, category) {
  // Iterate over each year in the data
  for (const year in data) {
    if (data.hasOwnProperty(year)) {
      // Get the income object for the current year
      const categoryObj = data[year][category];

      // Sort the income object by key
      const sortedCategoryObj = Object.keys(categoryObj)
        .sort()
        .reduce((obj, key) => {
          obj[key] = categoryObj[key];
          return obj;
        }, {});

      // Update the income object in the data with the sorted version
      data[year][category] = sortedCategoryObj;
    }
  }

  return data;
}
function checkForExistingKey(length, category) {
  switch (category) {
    case "GENDER":
      return length === 2;
    case "CATEGORY":
      return length === 4;
    case "INCOME":
      return length === 7;
    case "EDUCATION":
      return length === 6;
    case "AGE":
      return length === 5;
  }
}

function debouncing(func, delay) {
  let timeoutId;
  return (...args) => {
    let a = clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log("called", a);
      func.apply(null, args);
    }, delay);
  };
}
export { formateData, convertColumnData, convertRowData, debouncing };

// 1. non existing key remove from formatte function to add in result
// 2. logic  for row bar charts data
