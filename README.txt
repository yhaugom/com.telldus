#Add your Telldus Z-wave devices to Homey.

## These are the currently supported devices
* [Z-wave Door/window sensor](https://products.z-wavealliance.org/products/1455/) - Contact alarm (TZDW-100)
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/1536/) - Plug-in Switch (Schuko - TZWP-100)
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/2892) - Plug-in Switch Mini (TZWP-102)

## Version log
* 1.0.0 - Initial version - support for Door/window sensor
* 1.0.1 - Added Plug-in Switch (Schuko) TZWP-100. Bugfix.
* 1.0.2 - Added Telldus plug-in mini switch.
* 1.0.3 - Rewrite to support SDK 2, and new athom-cli. Changed id´s to be strings. Added condition - meassured power in range for Telldus TZWP-102 plug.
* 1.1.0 - Stable version
* 1.1.1 (beta) - Fixed settings hint. Wrong description for TZWP-102 when power failure. Bad default values for TZWP-102 settings, and changed scale for percentage scale.
* 1.1.2 - Replaced icon for TZWP-102. Was displayed incorrectly in newer version of app. Thanks to Marcus Karlsson and Johan Bendz for icon contribution and testing.
* 1.1.3 - BETA - Fixed problem with plug-in switch TZWP-100 not updating status when manually triggered on plug. Energy compability updates.