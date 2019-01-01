# Telldus

# Adds support for Telldus Z-wave devices
* The id of the drivers is the product number from [The Z-wave Alliance.](https://products.z-wavealliance.org/products/)
## Supported devices
* [Z-wave Door/window sensor](https://products.z-wavealliance.org/products/1455/) - Contact alarm
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/1536/) - Plug-in Switch (Schuko)
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/2892) - Plug-in Switch Mini (TZWP-102)

## Version log
* 1.0.0 - Initial version - support for Door/window sensor
* 1.0.1
* 1.0.2
* 1.0.3 - rewrite to support SDK 2, and new athom-cli. Changed id´s to be strings. Contribution from @ksjoberg - condition - meassured power in range for Telldus TZWP-102 plug.

## Issues
### Z-wave Plug-in switch
* Not tested settings
### Plug-in Switch Mini
* Some settings does not seem to stick. 
* Inclusion sometimes seem to timeout, especially if the plug has to a go via a couple nodes in the mesh. Keep the plug close to the controller while including it.
