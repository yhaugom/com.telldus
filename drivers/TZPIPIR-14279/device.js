'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class TelldusPetImmunePIRSensor14279 extends ZwaveDevice {

  /**
   * onInit is called when the device is initialized.
   */
  async onNodeInit() {
    try {
      this.enableDebug();
      this.printNode();
  
      this.registerCapability('measure_battery', 'BATTERY', {
			getOpts: {
				getOnOnline: true 
			}
		});
      this.registerCapability('alarm_motion', 'NOTIFICATION');
      this.registerCapability('alarm_tamper', 'NOTIFICATION');
      this.registerCapability('measure_humidity', 'SENSOR_MULTILEVEL');
      this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
      this.log('Telldus Pet Immune PIR motion sensor initialized.');
    } catch (error) {
      this.error('An error occurred during initialization:', error);
    }
  }
  
  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('Telldus Pet Immune PIR motion sensor added.');
  }
}

module.exports = TelldusPetImmunePIRSensor14279;
