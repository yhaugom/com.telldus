'use strict';

const Homey = require('homey');

class MagnetDriver extends Homey.Driver {

    onPairListDevices( data, callback ){

        callback( null, [
            {
                name: 'Telldus magnet sensor',
                data: {
                    id: 'foo'
                }
            }
        ]);

    }

}

module.exports = MagnetDriver;