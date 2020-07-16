
var fsextra   = require('fs-extra');
var formidable = require('formidable');

const inspectForm = (req,res) => {
	console.log('upload');
   fs.readFile("simple.txt", "utf8", function (error, data) {
        console.log(data);
    });

	/*var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		uid = fields.uid.split(',');
	});
	form.on('end', function(fields, files) {
		form
	});
	form.on('progress', function(bytesReceived, bytesExpected) {
      var percent_complete = (bytesReceived / bytesExpected) * 100;
      //console.log(percent_complete.toFixed(2));
   });
   form.on('error', (err) => ErrorHandler(res,err) );*/
};

const SuccessHandler = (res,message) => { 
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end(message)
}

const ErrorHandler = (res,err) => {
	console.log(err);
	res.writeHead(500, {"Content-Type": "text/plain"});
   res.write(err.message);
   res.end();
};
exports.inspectForm = inspectForm