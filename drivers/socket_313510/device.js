'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class TelldusSocket313510 extends ZwaveDevice {
	
	async onMeshInit() {
		
		// enable debugging
		this.enableDebug();
		
		// print the node's info to the console
		this.printNode();

		this.registerCapability('onoff', 'BASIC');
	}
}

module.exports = TelldusSocket313510;