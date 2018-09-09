'use strict';

var strftime = require('strftime').utc();
var fs = require('fs');
var util = require('util');
require('colors');

module.exports = function (config) {
	config = config || {};
	var exports = {};

	config.levels = config.levels || {
		trace: 0,
		debug: 1,
		log: 2,
		info: 3,
		warn: 4,
		error: 5,
		fatal: 6
	};

	config.level_abbr = config.level_abbr || {
		trace: 'trc',
		debug: 'dbg',
		log: 'log',
		info: 'inf',
		warn: 'WRN',
		error: 'ERR',
		fatal: 'FTL'
	};

	config.filename = config.filename || __dirname + '/logs.log';

	config.errorLevel = config.errorLevel || 'log';

	var log_file = fs.createWriteStream(config.filename, {flags: 'a'});

	exports.setLevel = function (errorLevel) {
		config.errorLevel = errorLevel;
	};

	function snipsecret (data) {
		for (var key in data) {
			if (key.search(/secret/i) > -1) {
				data[key] = 'XXXXXXXXXX';
			}
		}
		return data;
	}

	Object.keys(config.levels).forEach(function (name) {
		function log (message, data) {
			var log = {
				level: name,
				timestamp: strftime('%F %T', new Date())
			};

			if (message instanceof Error) {
				log.message = message.stack;
			} else {

				if(message){
					log.message = message.toString();
					if(log.message.startsWith("# ")){
						var head="#".repeat(message.length+2);
						log.message=head+"\n";
						log.message+=message+" #\n";
						log.message+=head;
					}
				}
				else {
					log.message = message;
				}
			}

			if (data && util.isObject(data)) {
				log.data = JSON.stringify(snipsecret(data));
			} else {
				log.data = data;
			}

			log.symbol = config.level_abbr[log.level] ? config.level_abbr[log.level] : '???';

			if (config.levels[config.errorLevel] <= config.levels[log.level]) {
				log.message.split("\n").forEach(function(m){
					if (log.data) {
						log_file.write(util.format('[%s] %s | %s - %s\n', log.symbol, log.timestamp, m, log.data));
					} else {
						log_file.write(util.format('[%s] %s | %s\n', log.symbol, log.timestamp, m));
					}
				});
			}

			if (config.echo && config.levels[config.echo] <= config.levels[log.level]) {
				log.message.split("\n").forEach(function(m){
					if (log.data) {
						console.log('['+log.symbol.bgYellow.black+']', log.timestamp.grey, '|', m, '-', log.data);
					} else {
						console.log('['+log.symbol.bgYellow.black+']', log.timestamp.grey, '|', m);
					}
				});
			}
		}

		exports[name] = log;
	});

	return exports;
};
