//Parses the MMR forecast CSV into JSON array

const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

const CSV_FILE_NAME = 'MMRForecast'

let inputStream = Fs.createReadStream(`${CSV_FILE_NAME}.csv`, 'utf8');

const x = []

inputStream
	.pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
	.on('data', function (row) {
	    console.log('A row arrived: ', row);
			x.push(row)
	})
	.on('end', function () {
		Fs.writeFile("./MMRCSV.json", JSON.stringify(x), 'utf8', function (err) {
			if (err) {
					return console.log(err);
			}
	
			console.log("The file was saved!");
	}); 
	    console.log('No more rows!');
	});