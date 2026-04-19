/*
 * pwix:core-app/src/common/js/accounts-manager.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Permissions } from 'meteor/pwix:permissions';
import { Roles } from 'meteor/pwix:roles';

Permissions.set({
    pwix: {
        accounts_core: {
            feat: {
                // opts.instance: target amAccount instance
                async create( userId, opts ){
                    if( opts.instance.name() === 'users' ){
                        return await Roles.userIsInRoles( Meteor.userId(), 'ACCOUNTS_MANAGER', { anyScope: true });
                    }
                    return false;
                },
                // opts.instance: target amAccount instance
                // opts.rowId: the account identifier
                async delete( userId, opts ){
                    if( opts.instance.name() === 'users' ){
                        return await Roles.userIsInRoles( Meteor.userId(), 'ACCOUNTS_MANAGER', { anyScope: true });
                    }
                    return false;
                },
                // opts.instance: target amAccount instance
                // opts.rowId: the account identifier
                async edit( userId, opts ){
                    if( opts.instance.name() === 'users' ){
                        return await Roles.userIsInRoles( Meteor.userId(), 'ACCOUNTS_MANAGER', { anyScope: true });
                    }
                    return false;
                },
                // opts.instance: target amAccount instance
                async list( userId, opts ){
                    if( opts.instance.name() === 'users' ){
                        return await Roles.userIsInRoles( Meteor.userId(), 'ACCOUNTS_MANAGER', { anyScope: true });
                    }
                    return false;
                }
            }
        }
    }
});
