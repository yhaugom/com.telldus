'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class TelldusRemotePlug extends ZwaveDevice {
	
	async onMeshInit() {
		
		// enable debugging
//		this.enableDebug();
		
		// print the node's info to the console
		this.printNode();

		this.registerCapability('onoff', 'BASIC');
		
		// register a report listener
		this.registerReportListener('SWITCH_BINARY', 'SWITCH_BINARY_REPORT', ( rawReport, parsedReport ) => {
			console.log('registerReportListener', rawReport, parsedReport);
		});
	}
}

module.exports = TelldusRemotePlug;
