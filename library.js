"use strict";
var winston = module.parent.require('winston'),
	async = module.parent.require('async'),
	meta = module.parent.require('./meta');

	var fs = require('fs');


(function (googlefont) {
	googlefont.replaceFonts = function (path,callback){
		fs.exists(path, function (exists) {
			if(exists){
				fs.readFile(path,'utf8', function (err, data) {
					if (err) throw err;
					data = data.replace('fonts.googleapis.com/css?family=Raleway:100,300,700,900,500','fonts.useso.com/css?family=Open+Sans:300,400,600')
					fs.writeFile(path,data,'utf8',function(err){
						if (err) throw err;
						callback();
					});
				});
			}else{
				callback();
			}
		});
	};
	var customJS = '';
	googlefont.init = function (params, callback) {

		async.waterfall([
			function (next) {
				var fontspath = './node_modules/nodebb-theme-lavender/less/whiteplum.less';
				googlefont.replaceFonts(fontspath,next);
			}
		], function (err) {
			callback();
		});
	};

}(module.exports));
