# Telldus

# Adds support for Telldus Z-wave devices
* The id of the drivers is the product number from [The Z-wave Alliance.](https://products.z-wavealliance.org/products/)
## Supported devices
* [Z-wave Door/window sensor](https://products.z-wavealliance.org/products/1455/) - Contact alarm
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/1536/) - Plug-in Switch (Schuko)
* [Z-wave Plug-in switch](https://products.z-wavealliance.org/products/2892) - Plug-in Switch Mini (TZWP-102)
## Issues
### Z-wave Door/window sensor
* Not fully tested the settings. Need to test battery readings, and if settings works. 
### Z-wave Plug-in switch
* Not tested settings
### Plug-in Switch Mini
* Settings does not seem to stick. 
* Since my graphical skill are slim to none, I used the icons from the assets of the other switch.
* Inclusion seems to timeout, especially if the plug has to a go via a couple nodes in the mesh. Kepp the plug close to the controller while including it.
