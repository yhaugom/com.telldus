'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class TelldusTZWP102 extends ZwaveDevice {
	
	async onMeshInit() {
		// enable debugging
		this.enableDebug();

		//print the node's info to the console
		//this.printNode();

		this.registerCapability('onoff','BASIC');
		this.registerCapability('onoff','SWITCH_BINARY');
		this.registerCapability('meter_power','METER');
		this.registerCapability('measure_power','METER');
	}
}

module.exports = TelldusTZWP102;