'use strict';

const Homey = require('homey');

class telldusApp extends Homey.App {
	
	onInit() {
		
		this.log('${Homey.manifest.id} is running...');
		
	}
	
}

module.exports = telldusApp;
