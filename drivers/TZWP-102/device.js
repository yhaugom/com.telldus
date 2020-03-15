'use strict';
const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class TelldusTZWP102 extends ZwaveDevice {

	async onMeshInit() {
		this.registerCapability('onoff','BASIC');
		this.registerCapability('onoff','SWITCH_BINARY');
		this.registerCapability('meter_power','METER');
		this.registerCapability('measure_power','METER');

    this.registerCapabilityListener('button.reset_meter', async () => {

        // Maintenance action button was pressed, return a promise
				if (this.node &&
					this.node.CommandClass.COMMAND_CLASS_METER) {
						this.log('Node has METER_RESET');
					return await this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});
				}
				this.log('Does not support meter resets');
				return Promise.reject('This device does not support meter resets');
    });
	}
}
module.exports = TelldusTZWP102;
