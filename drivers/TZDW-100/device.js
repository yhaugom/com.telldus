'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class TelldusDoorWindowSensor extends ZwaveDevice {
	
	async onMeshInit() {
		// register the `measure_battery` capability with COMMAND_CLASS_BATTERY and with the
		// default system capability handler (see: lib/zwave/system/capabilities)
 		this.registerCapability('measure_battery', 'BATTERY');
		this.registerCapability('alarm_contact', 'SENSOR_BINARY', {
			getOpts: {
				getOnOnline: true, // use only for battery devices
			}
		});
	}

	
}

module.exports = TelldusDoorWindowSensor;