'use strict';

const Homey = require('homey');

class TelldusApp extends Homey.App {

	async onInit() {
		try {
			// Register current power condition
			let currentPowerCondition = this.homey.flow.getConditionCard('current_power');
			if (currentPowerCondition) {
				currentPowerCondition.registerRunListener(async (args, state) => {
					try {
						const power = args.device?.getCapabilityValue('measure_power');
						if (typeof power !== 'number') return false;
						
						const margin = args.watt * args.errormargin / 100;
						return (power >= args.watt - margin) && (power < args.watt + margin);
					} catch (error) {
						this.error('Error in current_power condition:', error);
						return false;
					}
				});
			}

			// Register reset meter action
			let resetMeterAction = this.homey.flow.getActionCard('reset_meter');
			if (resetMeterAction) {
				resetMeterAction.registerRunListener(async (args, state) => {
					try {
						if (args.device && args.device.node && args.device.node.CommandClass && args.device.node.CommandClass.COMMAND_CLASS_METER) {
							this.log('Action card METER_RESET triggered');
							return await args.device.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});
						}
						this.log('Device does not support meter resets, or not a valid node.');
						return Promise.reject('The device could not be reset');
					} catch (error) {
						this.error('Error in reset_meter action:', error);
						return Promise.reject('The device could not be reset');
					}
				});
			}

			this.log('Telldus Z-wave is running...');
		} catch (error) {
			this.error('Failed to initialize app:', error);
		}
	}

	async onUninit() {
		this.log('Telldus Z-wave shutting down...');
	}
}

module.exports = TelldusApp;
