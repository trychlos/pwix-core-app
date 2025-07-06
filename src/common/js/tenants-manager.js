/*
 * pwix:core-app/src/common/js/accounts-manager.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Permissions } from 'meteor/pwix:permissions';
import { Roles } from 'meteor/pwix:roles';

Permissions.set({
    pwix: {
        tenants_manager: {
            feat: {
                // item: the tenant object
                async delete( userId, item ){
                    return await Roles.userIsInRoles( Meteor.userId(), 'TENANTS_MANAGER', { anyScope: true });
                },
                // item: the tenant object
                async edit( userId, item ){
                    return await Roles.userIsInRoles( Meteor.userId(), 'TENANTS_MANAGER', { anyScope: true });
                },
                async new( userId ){
                    return await Roles.userIsInRoles( Meteor.userId(), 'TENANTS_MANAGER', { anyScope: true });
                },
                // scope: the scope identifier
                async roles( userId, scope ){
                    return await Roles.userIsInRoles( Meteor.userId(), 'TENANTS_MANAGER', { anyScope: true });
                }
            },
            pub: {
                // whether to get the known scopes
                async known_scopes( userId ){
                    return await Roles.userIsInRoles( Meteor.userId(), 'TENANTS_MANAGER', { anyScope: true });
                },
                // whether to list the tenants
                async list_all( userId ){
                    return await Roles.userIsInRoles( Meteor.userId(), 'TENANTS_MANAGER', { anyScope: true });
                }
            }
        }
    }
});
