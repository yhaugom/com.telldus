'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

/**
 * It is possible to use default system capability handlers (see: lib/zwave/system/capabilities), by registering a
 * capability without an options object (see below). There are also various standard ZwaveDevice implementations (see:
 * lib/zwave), some of them use settings and flow cards (which are optional) and can be found in
 * lib/system/(flows|settings).json.
 */
class TelldusDoorWindowSensor extends ZwaveDevice {
	
	async onMeshInit() {
		
		// enable debugging
		this.enableDebug();
		
		// print the node's info to the console
		this.printNode();

		// register the `measure_battery` capability with COMMAND_CLASS_BATTERY and with the
		// default system capability handler (see: lib/zwave/system/capabilities)
 		this.registerCapability('measure_battery', 'BATTERY');
	
		this.registerCapability('alarm_contact', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true, // use only for battery devices
			}
		});
		
		// register a report listener
/*
		this.registerReportListener('SWITCH_BINARY', 'SWITCH_BINARY_REPORT', ( rawReport, parsedReport ) => {
			console.log('registerReportListener', rawReport, parsedReport);
		});
*/

/*
		// Set configuration value that is defined in manifest
		await this.configurationSet({id: 'motion_threshold'}, 10);

		// Or set configuration value that is not defined in manifest
		await this.configurationSet({index: 1, size: 2}, 10);
*/
	}

	
}

module.exports = TelldusDoorWindowSensor;