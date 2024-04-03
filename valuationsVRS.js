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
          api_key: "vz9grae7m85nznsygg8csrar"
        }
      }
    );
console.log(x?.data, 'testtt')
    return x?.data?.prices;
};

run();
