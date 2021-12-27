# Telldus

# Adds support for Telldus Z-wave devices
* The id of the drivers is the product number from [The Z-wave Alliance.](https://products.z-wavealliance.org/products/)
## Supported devices
* [Z-wave Door/window sensor](https://products.z-wavealliance.org/products/1455/) - Contact sensor (TZDW-100)
* Z-wave Door/window sensor - White label product with Telldus rebrand. - Contact sensor (TZDW-15110)
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/1536/) - Plug-in Switch (Schuko - TZWP-100)
* [Z-wave Plug-in Switch](https://products.z-wavealliance.org/products/1542) - Plug-in Switch (French - TZWP-101)
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/2892) - Plug-in Switch Mini (TZWP-102)

## Version log
* 1.0.0 - Initial version - support for Door/window sensor
* 1.0.1 - Added Plug-in Switch (Schuko) TZWP-100. Bugfix.
* 1.0.2 - Added Telldus plug-in mini switch.
* 1.0.3 - Rewrite to support SDK 2, and new athom-cli. Changed id´s to be strings. Added condition - meassured power in range for Telldus TZWP-102 plug.
* 1.1.0 - Stable version
* 1.1.1 (beta) - Fixed settings hint. Wrong description for TZWP-102 when power failure. Bad default values for TZWP-102 settings, and changed scale for percentage scale.
* 1.1.2 - Replaced icon for TZWP-102. Was displayed incorrectly in newer version of app. Thanks to Marcus Karlsson and Johan Bendz for icon contribution and testing.
* 1.1.3 - Fixed problem with plug-in switch TZWP-100 not updating status when manually triggered on plug. Energy compability updates.
* 1.1.4 - Exclusion description updated. Readme.txt updated.
* 1.2.0 - Support for Homey V5, SDK 3.0, added power reset for TZWP-102 (maintainance action and flow action), inclusion/exclusion description updated, updated icon for TZWP-100. Updated readme file, plus minor changes.
* 1.2.1 - Added Plug-in French version TZWP-101, description in Norwegian.
* 1.3.0 Added new device, Telldus Door/Window sensor. White label device with Telldus branding. Updated localization, plus various minor fixes.
