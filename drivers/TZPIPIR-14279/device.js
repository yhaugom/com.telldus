'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class TelldusPetImmunePIRSensor14279 extends ZwaveDevice {

  /**
   * onInit is called when the device is initialized.
   */
  async onNodeInit({ node }) {
    try {
      node.log('Telldus Pet Immune PIR motion sensor initialized.');
      node.enableDebug();
      node.printNode();
  
      node.registerCapability('alarm_battery', 'BATTERY');
      node.registerCapability('alarm_motion', 'MOTION');
      node.registerCapability('alarm_tamper', 'TAMPER');
      node.registerCapability('measure_humidity', 'HUMIDITY');
      node.registerCapability('measure_temperature', 'TEMPERATURE');
    } catch (error) {
      node.error('An error occurred during initialization:', error);
    }
  }
  
  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded({ node }) {
    node.log('Telldus Pet Immune PIR motion sensor added.');
  }
}

module.exports = TelldusPetImmunePIRSensor14279;
