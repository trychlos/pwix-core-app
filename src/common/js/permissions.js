/*
 * pwix:core-app/src/common/js/permissions.js
 * 
 * DisplayUnit's are defined in common code to be scanned for reserved words.
 * They are nonetheless instanciated in client side only.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Permissions } from 'meteor/pwix:permissions';
import { Roles } from 'meteor/pwix:roles';

Permissions.set({
    pwix: {
        app_pages_edit: {
            // whether the current user is allowed to edit the document
            // page: DisplayUnit
            async editable( userId, page ){
                return await Roles.userIsInRoles( userId, 'APP_EDITOR' );
            }
        },
        core_app: {
            menus: {
                async managers(){
                    return Roles.userIsInRoles( Meteor.userId(), [ 'ACCOUNTS_MANAGER', 'TENANTS_MANAGER', 'SCOPED_TENANT_MANAGER' ], { anyScope: true });
                }
            }
        }
    }
});
