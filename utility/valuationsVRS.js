//calls the VRS valuation service

const axios = require("axios");

const data = {
  configuration: {
    vehicleId: 420897
  },
  valuationDate: "2024-03-25",
  // Mileage: 41000,
  ZipCode: "92503"
};

const run = async () => {
  const x = await axios
    .post(
      "https://vrs.datasolutions.coxautoinc.com/vrs/valuation/values/",
      data,
      {
        headers: {
          api_key: ''
        }
      }
    );
console.log(x?.data, 'testtt')
    return x?.data?.prices;
};

run();
