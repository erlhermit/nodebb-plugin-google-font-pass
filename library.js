"use strict";
var winston = module.parent.require('winston'),
	async = module.parent.require('async'),
	meta = module.parent.require('./meta');
(function (googlefont) {
	googlefont.init = function (params, callback) {
		async.waterfall([
			function (next) {
				if (meta.config.useCustomJS != '1') {
					meta.configs.set('useCustomJS', '1', next);
				} else {
					next();
				}
			},
			function (next) {
				if (meta.config.customJS && meta.config.customJS.indexOf('fonts.useso.com') > 0) {
					next();
				} else {
					meta.configs.set('customJS', "<link href='http://fonts.useso.com/css?family=Open+Sans:300,400,600&subset=latin,latin-ext' rel='stylesheet'>" + (meta.config.customJS ? meta.config.customJS : ''), function (err) {
						next();
					});
				}
			}
		], function (err) {
			winston.info('[gootle-font-pass]', 'used:customJS', meta.config.customJS);
			callback();
		});
	};

}(module.exports));