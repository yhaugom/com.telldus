'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class TelldusRemotePlug extends ZwaveDevice {
	
	async onMeshInit() {
		this.registerCapability('onoff', 'BASIC');
	}
}

module.exports = TelldusRemotePlug;