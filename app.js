'use strict';

const Homey = require('homey');

class TelldusApp extends Homey.App {

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

			let resetMeterAction = new Homey.FlowCardAction('TZWP-102_reset_meter');
			resetMeterAction
	    	.register()
				.registerRunListener((args, state) => {
					if (this.node &&
						this.node.CommandClass.COMMAND_CLASS_METER) {
						this.log('callback METER_RESET triggered');
						return Promise.resolve(this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({}));
						}return Promise.reject('unknown_error');
	          });

		this.log('Telldus Z-wave is running...');

	}

}

module.exports = TelldusApp;
