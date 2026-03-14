/*
 * pwix:core-app/src/common/js/accounts-manager.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Permissions } from 'meteor/pwix:permissions';
import { Roles } from 'meteor/pwix:roles';

Permissions.set({
    pwix: {
        accounts_manager: {
            feat: {
                // opts.amInstance: target amClass instance
                async create( userId, opts ){
                    if( opts.amInstance.name() === 'users' ){
                        return await Roles.userIsInRoles( Meteor.userId(), 'ACCOUNTS_MANAGER', { anyScope: true });
                    }
                    return false;
                },
                // opts.amInstance: target amClass instance
                // opts.rowId: the account identifier
                async delete( userId, opts ){
                    if( opts.amInstance.name() === 'users' ){
                        return await Roles.userIsInRoles( Meteor.userId(), 'ACCOUNTS_MANAGER', { anyScope: true });
                    }
                    return false;
                },
                // opts.amInstance: target amClass instance
                // opts.rowId: the account identifier
                async edit( userId, opts ){
                    if( opts.amInstance.name() === 'users' ){
                        return await Roles.userIsInRoles( Meteor.userId(), 'ACCOUNTS_MANAGER', { anyScope: true });
                    }
                    return false;
                },
                // opts.amInstance: target amClass instance
                async list( userId, opts ){
                    if( opts.amInstance.name() === 'users' ){
                        return await Roles.userIsInRoles( Meteor.userId(), 'ACCOUNTS_MANAGER', { anyScope: true });
                    }
                    return false;
                }
            }
        }
    }
});
