'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

module.exports = new ZwaveDriver(path.basename(__dirname), {
	debug: false,
	capabilities: {
		alarm_contact: [
			{
				command_class: 'COMMAND_CLASS_SENSOR_BINARY',
				command_get: 'SENSOR_BINARY_GET',
				command_report: 'SENSOR_BINARY_REPORT',
				command_report_parser: report => report['Sensor Value'] === 'detected an event',
			},
			{
				command_class: 'COMMAND_CLASS_BASIC',
				command_report: 'BASIC_SET',
				command_report_parser: report => report.Value === 255,
			},
		],
		},
	},

	settings: {
		Enable_External_Switch: {
			index: 1,
			size: 1,
		}
	},
});
