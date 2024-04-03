const dates = [
  "2024-03-25",
  "2024-03-18",
  "2024-03-11",
  "2024-03-04",
  "2024-03-04",
  "2024-02-26",
  "2024-02-19",
  "2024-02-12",
  "2024-02-05",
  "2024-01-29",
  "2024-01-22"
];
const vehicleFiles = "vehicleFiles.json";

window.onload = async function () {
  let data = await fetch(vehicleFiles).then(response => response.json());
  // console.log(data);

  parent = document.querySelector("#vehicle");

  for (let i = 0; i < data.length; i++) {
    const option = document.createElement("option");
    option.value = data[i];
    option.innerText = data[i];
    parent.append(option);
  }

  document.createElement("div");

  Promise.all([
    functionGenerateChart("2017-HONDA-ACCORD 4C-4D SEDAN LX.json", 420897),
    functionGenerateChart(
      "2020-FORD-F150 2WD V6-REG CAB 2.7L XL.json",
      447398,
      2
    ),
    functionGenerateChart("2023-SUBARU-IMPREZA-4D SEDAN LIMITED.json", 461467, 3),
    functionGenerateChart("2017-TOYOTA-RAV4 AWD-4D SUV LE.json", 421396, 4)
  ])

};

const functionGenerateChart = async (FILE_NAME, vehicleId, index) => {
  const priceTypes = {
    "Fair Purchase Price": { priceId: 130, data: [] },
    "Trade-In Value Excellent": { priceId: 5, data: [] },
    "Trade-In Value Very Good": { priceId: 109, data: [] },
    "Trade-In Value Good": { priceId: 4, data: [] },
    "Auction Value Excellent": { priceId: 77, data: [] },
    "Auction Value Very Good": { priceId: 111, data: [] },
    "Auction Value Good": { priceId: 76, data: [] },
    "Auction Value Fair": { priceId: 75, data: [] },
    "Trade-In Value Fair": { priceId: 3, data: [] }
  };

  // let data = await fetch(FILE_NAME).then(response => response.json());
    let data = await fetch(`https://raw.githubusercontent.com/brandonktran/historicalAndForecastVehiclePricing/main/${FILE_NAME}`).then(response => response.json());
  // https://raw.githubusercontent.com/brandonktran/historicalAndForecastVehiclePricing/main/2017-ACURA-ILX-4D SEDAN ACURAWATCH PLUS.json
  // let errors = [...data]

  for (let i = 0; i < data.length; i++) {
    data[i].y = data[i].price;
    data[i].x = new Date(data[i].date);
    // errors[i].y = errors[i].dev;
    // errors[i].x = new Date(errors[i].date);
  }

  if (vehicleId) {
    for (let i = 0; i < dates.length; i++) {
      const body = {
        configuration: {
          vehicleId: vehicleId
        },
        valuationDate: dates[i],
        // Mileage: 41000,
        ZipCode: "92841"
      };
  
      const historical = await fetch(
        "https://vrs.datasolutions.coxautoinc.com/vrs/valuation/values/",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            api_key: "vz9grae7m85nznsygg8csrar"
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(body) // body data type must match "Content-Type" header
        }
      ).then(response => response.json());
  
      historical.prices.forEach(x => {
        if (Object.keys(priceTypes).includes(x.priceTypeDisplay)) {
          priceTypes[x.priceTypeDisplay].data.push({
            y: x.baseValue || x.configuredValue,
            x: new Date(dates[i])
          });
        }
      });
    }
          // console.log(priceTypes, data, "testtt");
  }


  var chart = new CanvasJS.Chart(`chartContainer${index || ""}`, {
    animationEnabled: true,
    title: {
      text: `${FILE_NAME.replace(".json", "")}`
    },
    axisX: {
      valueFormatString: "DD MMM,YY"
    },
    axisY: {
      title: "Price $",
      suffix: ""
    },
    legend: {
      cursor: "pointer",
      fontSize: 16,
      itemclick: toggleDataSeries
    },
    toolTip: {
      shared: true
    },
    data: [
      {
        name: "forecast",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: data
      },
      {
        name: "Trade-In Fair",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Trade-In Value Fair"].data
      },
      {
        name: "Trade-In Good",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Trade-In Value Good"].data
      },
      {
        name: "Trade-In Very Good",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Trade-In Value Very Good"].data
      },
      {
        name: "Trade-In Excellent",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Trade-In Value Excellent"].data
      },
      {
        name: "Auction Fair",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Auction Value Fair"].data
      },
      {
        name: "Auction Good",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Auction Value Good"].data
      },
      {
        name: "Auction Very Good",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Auction Value Very Good"].data
      },
      {
        name: "Auction Excellent",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Auction Value Excellent"].data
      },
      {
        name: "Fair Purchase Price",
        type: "spline",
        yValueFormatString: "",
        showInLegend: true,
        dataPoints: priceTypes["Fair Purchase Price"].data
      }
      // {
      //   type: "error",
      //   dataPoints: errors
      // }
    ]
  });
  chart.render();

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
};

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("vehicle").addEventListener("change", updateChart, true);
  function updateChart(e) {
    e.preventDefault();
    e.stopPropagation();
      functionGenerateChart(e.currentTarget.value);
  }
});

