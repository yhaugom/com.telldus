'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class TelldusDoorWindowSensor15110 extends ZwaveDevice {

	async onNodeInit({ node }) {

		// register device capabilities
		this.registerCapability('alarm_contact', 'NOTIFICATION');
		this.registerCapability('alarm_tamper', 'NOTIFICATION');
		this.registerCapability('measure_battery', 'BATTERY');
	}

}

module.exports = TelldusDoorWindowSensor15110;