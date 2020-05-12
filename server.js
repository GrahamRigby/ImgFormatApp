var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Jimp = require('jimp');
var cors = require('cors');
const fs = require('fs');
const multer = require('multer');
// Then use it before your routes are set up:
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8000

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, "im") //Appending .jpg
  }
})

var upload = multer({ storage: storage });

app.post('/image/convert', upload.any(), function (req, res, next) {
	var format = req.body.format
	var oldformat = req.body.oldformat
	fs.rename('uploads/im', 'uploads/im.'+oldformat, function(err) {
    	if ( err ) console.log('ERROR: ' + err);
	});

	if (format === "BMP") {
		Jimp.read("uploads/im."+oldformat, function (err, im) {
			if (err) throw err;
	        im.write("uploads/newim.bmp", function(err) {
				var newcontent
				fs.readFile('uploads/newim.'+format.toLowerCase(), function read(err, data){
					if (err) {
						console.log(err)
					}
					newcontent = data
				})
				var contentType = 'image/'+format.toLowerCase();
				res.sendFile(__dirname + '/uploads/newim.'+format.toLowerCase())
			}		
		)
	})}	
	if (format === 'PNG') {
		Jimp.read("uploads/im."+oldformat, function (err, im) {
			if (err) throw err;
	        im.write("uploads/newim.png", function(err) {
				var newcontent
				fs.readFile('uploads/newim.'+format.toLowerCase(), function read(err, data){
					if (err) {
						console.log(err)
					}
					newcontent = data
				})
				var contentType = 'image/'+format.toLowerCase();
				res.sendFile(__dirname + '/uploads/newim.'+format.toLowerCase())
			}		
		)
	})}	
	if (format === 'JPG') {
		Jimp.read("uploads/im."+oldformat, function (err, im) {
			if (err) throw err;
	        im.write("uploads/newim.jpg", function(err) {
				var newcontent
				fs.readFile('uploads/newim.'+format.toLowerCase(), function read(err, data){
					if (err) {
						console.log(err)
					}
					newcontent = data
				})
				var contentType = 'image/'+format.toLowerCase();
				res.sendFile(__dirname + '/uploads/newim.'+format.toLowerCase())
			}
		)
	})}
	
});

app.get('/', function(req, res) {
    res.json({ message: 'hi' });
    console.log('hi')
});

app.listen(port);
console.log('hi')