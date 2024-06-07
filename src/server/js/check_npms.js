/*
 * pwix:core-app/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versiomns';

if( false ){
    // whitelist packages which are included via a subfolder or badly recognized
    require( '@popperjs/core/package.json' );
    require( 'bootstrap/package.json' );
    require( 'ellipsize/package.json' );
}

checkNpmVersions({
    '@popperjs/core': '^2.11.6',
    'bootstrap': '^5.2.1',
    'ellipsize': '^0.5.1',
    'lodash': '^4.17.0',
    'strftime': '^0.10.2',
    '@vestergaard-company/js-mixin': '^1.0.3'
},
    'pwix:core-app'
);
