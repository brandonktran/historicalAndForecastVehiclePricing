//creates MMR JSON file for each vehicle from the CSV and can also format the original JSON CSV file

const Fs = require('fs');

// const z = [];
const h = {};

const data = Fs.readFileSync(`./formattedMMRCSV.json`, 'utf8')
    const z = JSON.parse(data);

    console.log(z[0])

// for (let i = 0; i<vehicleData.length; i++) {
  // z.push({date: vehicleData[i][0], year: vehicleData[i][2], make: vehicleData[i][3], model: vehicleData[i][4], trim: vehicleData[i][5], price: vehicleData[i][9], miles: vehicleData[i][10], dev: vehicleData[i][12], makeId: vehicleData[i][6], modelId: vehicleData[i][7], trimId: vehicleData[i][8], kbbVehicleId: ''})
// }


for (let i = 0; i<z.length; i++) {
  const name = `${z[i].year}-${z[i].make}-${z[i].model}-${z[i].trim}`.replaceAll("/", "")
  if (h[name]) {
    h[name].push(z[i])
  } else {
    h[name] = [z[i]]
  }
}

for (let i = 0; i<Object.keys(h).length; i++) {
  Fs.writeFileSync(`./${Object.keys(h)[i]}.json`, JSON.stringify(h[Object.keys(h)[i]]), 'utf8')
}

// Fs.writeFileSync("./data.json", JSON.stringify(z), 'utf8')