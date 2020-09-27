'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class TelldusRemotePlug extends ZwaveDevice {

	async onNodeInit({ node }) {
		this.enableDebug();
		this.printNode();
		
		this.registerCapability('onoff', 'BASIC');
		this.registerCapability('onoff', 'SWITCH_BINARY');
	}
}

module.exports = TelldusRemotePlug;
