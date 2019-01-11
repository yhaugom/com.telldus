'use strict';

const Homey = require('homey');

class telldusApp extends Homey.App {
	
	onInit() {
		
		let currentPowerCondition = new Homey.FlowCardCondition('current_power');
		currentPowerCondition
			.register()
			.registerRunListener(( args, state ) => {
				var power = args.plugin_switch_mini.getCapabilityValue('measure_power');
				var margin = args.W * args.errormargin / 100;

				if ((power >= args.W - margin) && (power < args.W + margin))
				{
					return Promise.resolve( true );
				}

				return Promise.resolve( false );
			});

		this.log('${Homey.manifest.id} is running...');
		
	}
	
}

module.exports = telldusApp;
