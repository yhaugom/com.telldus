'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class TelldusTZWP102 extends ZwaveDevice {

	async onMeshInit() {
		this.registerCapability('onoff','BASIC');
		this.registerCapability('onoff','SWITCH_BINARY');
		this.registerCapability('meter_power','METER');
		this.registerCapability('measure_power','METER');
		// this.registerCapability('measure_current','METER');
		// this.registerCapability('measure_voltage','METER');


    this.registerCapabilityListener('button.reset_meter', async () => {

        // Maintenance action button was pressed, return a promise
				if (this.node &&
					this.node.CommandClass.COMMAND_CLASS_METER) {
					return await this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});
				}
				return Promise.reject('This device does not support meter resets');
    });

   	this.resetMeterAction = new Homey.FlowCardAction('TZWP-102_reset_meter')
          .register().registerRunListener((args, state) => {
              return resetMeterRunListener(args, state);
          });
	}

	async resetMeterRunListener(args, state) {
		if (this.node.CommandClass.COMMAND_CLASS_METER) {
			return await this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});
		} return Promise.reject('unknown_error');
	}

	async resetMeterFlowListener(args) {
		if (this.node &&
			this.node.CommandClass.COMMAND_CLASS_METER) {
			return await this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});
		}
		return Promise.reject('This device does not support meter resets');
	}


}

module.exports = TelldusTZWP102;
