'use strict';

const Homey = require('homey');

class TelldusApp extends Homey.App {

	async onInit() {
		let currentPowerCondition = this.homey.flow.getConditionCard('current_power');
		currentPowerCondition
			.registerRunListener(async( args, state ) => {
				var power = args.plugin_switch_mini.getCapabilityValue('measure_power');
				var margin = args.W * args.errormargin / 100;

				if ((power >= args.W - margin) && (power < args.W + margin))
				{
					return true;
				}
				return false;
			});
			
		this.log('Telldus Z-wave is running...');

	}

	async onUninit() {
		this.api.destroy();
	  }
}

module.exports = TelldusApp;
