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

			let resetMeterAction = this.homey.flow.getActionCard('TZWP-102_reset_meter');
			resetMeterAction
				.registerRunListener(async(args, state) => {
					if (this.node &&
						this.node.CommandClass.COMMAND_CLASS_METER) {
						this.log('callback METER_RESET triggered');
						this.log(this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({}));
						return this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});
						}
						return Promise.reject('unknown_error');
	          });

		this.log('Telldus Z-wave is running...');

	}

}

module.exports = TelldusApp;
