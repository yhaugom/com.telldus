# Telldus

# Adds support for Telldus Z-wave devices
* The id of the drivers is the product number from [The Z-wave Alliance.](https://products.z-wavealliance.org/products/)
## Supported devices
* [Z-wave Door/window sensor](https://products.z-wavealliance.org/products/1455/) - Contact alarm (TZDW-100)
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/1536/) - Plug-in Switch (Schuko - TZWP-100)
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/2892) - Plug-in Switch Mini (TZWP-102)

## Version log
* 1.0.0 - Initial version - support for Door/window sensor
* 1.0.1 - Added Plug-in Switch (Schuko) TZWP-100. Bugfix.
* 1.0.2 - Added Telldus plug-in mini switch.
* 1.0.3 - Rewrite to support SDK 2, and new athom-cli. Changed id´s to be strings. Added condition - meassured power in range for Telldus TZWP-102 plug.
* 1.1.0 - Stable version
* 1.1.1 - Fixed setting hint. Wrong description for TZWP-102 when power failure.

## Known issues, or not tested
###Plug-in switch (Schuko)
* Not tested settings
### Plug-in mini switch
* Some settings does not seem to stick (need help with testing since I don´t have the device myself).

