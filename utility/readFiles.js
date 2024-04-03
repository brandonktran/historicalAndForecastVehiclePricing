//Reads the file name for each vehicle with MMR data and creates json array

const Fs = require('fs');

const jsonFileRegex = /\.json$/;

const fileNames = [];

Fs.readdir('./', (err, files) => {
  if (err) {
    return console.log(err);
  }

  const jsonMMRVehicleFiles = files.filter(file => {
    // return JS files that have a matching source map file
    return file.match(jsonFileRegex) && !isNaN(file.substring(0,4));
  });

  console.log(jsonMMRVehicleFiles, 'fileNames');

  Fs.writeFileSync(`./vehicleFiles.json`, JSON.stringify(jsonMMRVehicleFiles), 'utf8')
});