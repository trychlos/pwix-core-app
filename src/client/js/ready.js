/*
 * pwix:core-app/src/client/js/ready.js
 *
 * Due to the (excessive ?) dynamic character of the package, we have to wait for it to be ready.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AccountsHub } from 'meteor/pwix:accounts-hub';
import { EnvSettings } from 'meteor/pwix:env-settings';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/pwix:roles';
import { Tracker } from 'meteor/tracker';

CoreApp.ready = new ReactiveVar( false );

Tracker.autorun(() => {
    let ready = true;
    // is the pwix:env-settings package ready ?
    ready &&= EnvSettings.ready();
    // is the 'users' accounts instance ready ?
    ready &&= AccountsHub.getInstance( 'users' );
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
    CoreApp.ready.set( ready );
});

Tracker.autorun(() => {
    console.debug( 'pwix:core-app ready', CoreApp.ready.get());
});
