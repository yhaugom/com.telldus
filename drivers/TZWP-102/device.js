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
			reportParser: report => {
				const value = extractMeterValue(report, 0); // 0 = kWh
				if (value == null) return null;
				const last = this.getCapabilityValue('meter_power');
				if (typeof last === 'number' && Number.isFinite(last)) {
					// strictly ignore any decreasing values unless it's a clear reset
					if (value < last) {
						if (value <= 0.1) return value; // accept reset to near 0
						this.log('Ignoring decreasing kWh value', { last, value });
						return null;
					}
				}
				return value;
			},
			getOpts: { getOnStart: true }
		});

		this.registerCapability('measure_power','METER', {
			report: 'METER_REPORT',
			reportParser: report => extractMeterValue(report, 2), // 2 = W
			getOpts: { getOnStart: true }
		});

		// Add measure_current capability if it doesn't exist on the device
		if (!this.hasCapability('measure_current')) {
			await this.addCapability('measure_current');
		}

		// Optional: current in A (Scale = 5 → Scale bit 2 = true, Scale bits 10 = 1)
		this.registerCapability('measure_current','METER', {
			report: 'METER_REPORT',
			reportParser: report => {
				if (!report || !report.Properties1 || report.Properties1['Scale bit 2'] !== true) return null;
				return extractMeterValue(report, 1); // bits10 = 1; combined with Scale bit 2 = true → A
			},
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
	    
	}
}
module.exports = TelldusTZWP102;
