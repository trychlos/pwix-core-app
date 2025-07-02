/*
 * pwix:core-app/src/common/init/accounts-ui.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AccountsUI } from 'meteor/pwix:accounts-ui';
import { pwixI18n } from 'meteor/pwix:i18n';

// provides the item to be added to acUserLogin logged/unlogged (client) menus
// please note that the 'click' event are handled at app_layout level
if( Meteor.isClient ){
    CoreApp.AccountsUI = {
        loggedItemsAfter(){
            return [
                '<hr class="dropdown-divider" />',
                '<a class="dropdown-item d-flex align-items-center justify-content-start" id="core-app-roles-item" href="#">'
                    + '<span class="fa-solid fa-fw fa-user-shield"></span>'
                    + '<p>'+pwixI18n.label( I18N, 'header.my_roles' )+'</p>'
                    + '</a>'
            ];
        }
    }
}
