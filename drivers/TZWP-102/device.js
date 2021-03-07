'use strict';
const Homey = require('homey');
const { ZwaveDevice } = require('homey-zwavedriver');

class TelldusTZWP102 extends ZwaveDevice {

	async onNodeInit({ node }) {
		this.enableDebug();
		this.printNode();
		
		this.registerCapability('onoff','BASIC');
		this.registerCapability('onoff','SWITCH_BINARY');
		this.registerCapability('meter_power','METER');
		this.registerCapability('measure_power','METER');

	    this.registerCapabilityListener('button.reset_meter', async () => 
		    {
		    	// Register button. Maintenance action button was pressed, return a promise
				if (this.node && this.node.CommandClass.COMMAND_CLASS_METER) 
				{
					this.log('Maintainance button METER_RESET pushed.');
					return await this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});

				}
				this.log('Does not support meter resets, or not a valid node.');
				return Promise.reject('The device could not be reset');
		    }	
	    );
	    
	    // Register flow action callback.
	    let resetMeterAction = this.homey.flow.getActionCard('TZWP-102_reset_meter');
		resetMeterAction.registerRunListener(async(args, state) => 
			{
				if (this.node && this.node.CommandClass.COMMAND_CLASS_METER) 
				{
					this.log('Action card METER_RESET triggered');
					return await this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});				
				}
				this.log('Does not support meter resets, or not a valid node.');
				return Promise.reject('The device could not be reset');
		    }
	    );
	}
}
module.exports = TelldusTZWP102;
