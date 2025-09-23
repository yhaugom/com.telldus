'use strict';
const { ZwaveDevice } = require('homey-zwavedriver');

class TelldusTZWP102 extends ZwaveDevice {

	async onNodeInit({ node }) {
		this.enableDebug();
		this.printNode();
		
		this.registerCapability('onoff','BASIC');
		this.registerCapability('onoff','SWITCH_BINARY');

		// Parsers for the scales we use (kWh, W) to prevent undefined capability updates for METER reports
		const extractMeterValue = (report, expectedScaleBits) => {
			if (!report || !report.Properties2 || typeof report.Properties2['Scale bits 10'] !== 'number') return null;
			if (report.Properties2['Scale bits 10'] !== expectedScaleBits) return null;
			let rawValue = report['Meter Value (Parsed)'] ?? report['Meter Value'] ?? report['Previous Meter Value (Parsed)'];
			if (rawValue && typeof rawValue === 'object' && rawValue.type === 'Buffer' && Array.isArray(rawValue.data)) {
				const size = report.Properties2.Size || rawValue.data.length;
				const precision = typeof report.Properties2.Precision === 'number' ? report.Properties2.Precision : 0;
				const bytes = rawValue.data.slice(0, size);
				let intVal = 0;
				for (let i = 0; i < bytes.length; i++) intVal = (intVal << 8) | (bytes[i] & 0xFF);
				rawValue = intVal / Math.pow(10, precision);
			}
			const num = typeof rawValue === 'number' ? rawValue : parseFloat(rawValue);
			return Number.isFinite(num) ? num : null;
		};

		this.registerCapability('meter_power','METER', {
			report: 'METER_REPORT',
			reportParser: report => extractMeterValue(report, 0), // 0 = kWh
			getOpts: { getOnStart: true }
		});

		this.registerCapability('measure_power','METER', {
			report: 'METER_REPORT',
			reportParser: report => extractMeterValue(report, 2), // 2 = W
			getOpts: { getOnStart: true }
		});

	    this.registerCapabilityListener('button.reset_meter', async () => 
		    {
		    	// Register button. Maintenance action button was pressed, return a promise
				if (this.node && this.node.CommandClass.COMMAND_CLASS_METER) 
				{
					this.log('Maintenance button METER_RESET pushed.');
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
