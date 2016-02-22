'use strict';

var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Product = require('../models/sampleSchema.js');
var router = require('express').Router();
var fs = require('fs');
var csvwriter = require('csvwriter');

var connectionString = 'mongodb://localhost:27017/temp-demo-db';


function connectDb() {
	if (mongoose.connection.readyState === 0) {
    mongoose.connect(connectionString);
  }
}

function streamDbProducts(res) {

  connectDb();

  let fields = 'asin,searchRank,name,createdAt,upc,price.amazon,price.ebay,ranks.0.number,ranks.0.category';
  let filename = 'db-data-' + new Date().getTime() + '.csv';
  let stream = Product.find({}).stream();
 
  res.set({'Content-Disposition': 'attachment; filename=\"' + filename + '\"', 'Content-type': 'text/csv'});
  res.write(fields + '\n');

  stream.on('error', function(err) {
    res.write('Error:' + err);
    throw new Error(err);
  });

  stream.on('data', function(doc) {
    // convert the json to csv.
    csvwriter(JSON.stringify(doc), {header: false, fields: fields}, function(err, csv) {
      if (err) {
        res.write('Error:' + err);
        throw new Error(err);
      }
      res.write(csv);
    });
  });

  stream.on('end', function() {
    // wait for any thing queued up to complete.
    setTimeout(function() {
      res.end('');
    }, 1000);

  });

}

router.get('/', function(req, res) {

  res.render('index', {
    title: 'Demo Large dataset (JSON) to CSV Exporter'
  });

});

router.get('/export/dbData', function(req, res) {

	streamDbProducts(res);

});

router.get('/export/jsonFileData', function(req, res) {

	// Get content from json file
	var fileContents = fs.readFileSync('./seed/test-data.json');
	// Define to JSON type
	var parsedFileContents = JSON.parse(fileContents);
	var filename = 'json-file-data-' + new Date().getTime() + '.csv';
	res.set({'Content-Disposition': 'attachment; filename=\"' + filename + '\"', 'Content-type': 'text/csv'});

	console.log('parsed contents length', parsedFileContents.length);
	// JSON to CSV Converter
	csvwriter(JSON.stringify(parsedFileContents), function(err, csvStr) {
  	res.send(csvStr);
	});

});


router.get('/export/dummyData', function(req, res) {

	var data = [], sampleJSON = {
		"asin" : "B00AFYB9QK",
		"indexer" : 243,
		"name" : "Upper Bounce 12' Black Color Trampoline Protection Weather And Rain Cover Fits 12FT Round Trampoline Frames",
		"createdAt" : new Date("2016-02-11T07:40:57.610Z"),
		"updatedAt" : new Date("2016-02-11T17:06:20.373Z"),
		"linkIds" : [
			"25b1071a9e908806338c4106",
			"25b1071a9e908806338c4104"
		],
		"price" : {
			"amazon" : 34.54,
			"ebay" : 22
		},
		"ranks" : [
			{
				"number" : 226422,
				"category" : "Boys & Girls"
			}
		],
		"upc" : "799975255774"
	};

	// creating some dummy json objects.
	var limit = 100000;
	for (var i = 0; i < limit; i++) {
		data.push(sampleJSON);
	}

	console.log('data length', data.length);

	var filename = 'dummy-data-' + new Date().getTime() + '.csv';
	res.set({'Content-Disposition': 'attachment; filename=\"' + filename + '\"', 'Content-type': 'text/csv'});

	// JSON to CSV Converter
	csvwriter(JSON.stringify(data), function(err, csvStr) {
  	// console.log('csvStr', csvStr);
  	res.send(csvStr);
	});

});

module.exports = router;