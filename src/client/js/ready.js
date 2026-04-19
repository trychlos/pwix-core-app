/*
 * pwix:core-app/src/client/js/ready.js
 *
 * Due to the (excessive ?) dynamic character of the package, we have to wait for it to be ready.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AccountsCore } from 'meteor/pwix:accounts-core';
import { EnvSettings } from 'meteor/pwix:env-settings';
import { Logger } from 'meteor/pwix:logger';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/pwix:roles';
import { Tracker } from 'meteor/tracker';

const logger = Logger.get();

CoreApp._ready = new ReactiveVar( false );

CoreApp.ready = function(){
    return CoreApp._ready.get();
};

Tracker.autorun(() => {
    let ready = true;
    // is the pwix:env-settings package ready ?
    ready &&= EnvSettings.ready();
    // is the 'users' accounts instance ready ?
    ready &&= Boolean( AccountsCore.getInstance( 'users' ));
    // is the pwix:roles package ready ?
    ready &&= Roles.ready();
    // is the pwix:startup-app-admin package ready (if enabled) ?
    if( Package['pwix:startup-app-admin'] ){
        ready &&= Package['pwix:startup-app-admin'].SAA.ready();
    }
    // is the pwix:tenants-manager package ready (if enabled) ?
    if( CoreApp.configure().haveTenantsManager ){
        ready &&= Boolean( Package['pwix:tenants-manager'] );
    }
    // set the readyness result
    CoreApp._ready.set( ready );
});

Tracker.autorun(() => {
    logger.debug( 'ready', CoreApp.ready());
});
