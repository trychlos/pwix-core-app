/*
 * pwix:core-app/src/client/components/manager_accounts_tab/manager_accounts_tab.js
 *
 * Users management.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AccountsHub } from 'meteor/pwix:accounts-hub';
import { AccountsManager } from 'meteor/pwix:accounts-manager';
import { PlusButton } from 'meteor/pwix:plus-button';
import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';

import '../account_edit_pane/account_edit_pane.js';

import './manager_accounts_tab.html';

Template.manager_accounts_tab.onCreated( function(){
    const self = this;

    self.PCK = {
        // whether the current user has the permission to see the list of accounts
        allowed: new ReactiveVar( false ),

        // the edit/new panel tabs
        tabs: [
            {
                tabid: 'app_account_tab',
                paneid: 'app_account_pane',
                navLabel: pwixI18n.label( I18N, 'accounts.edit.tab_title' ),
                paneTemplate: 'account_edit_pane'
            }
        ]
    };

    // whether the current user has the permission to see the list of accounts
    self.autorun(() => {
        AccountsManager.isAllowed( 'pwix.accounts_manager.feat.list', Meteor.userId(), { amInstance: AccountsHub.instances.users })
            .then(( allowed ) => {
                self.PCK.allowed.set( allowed );
            });
    });
});

Template.manager_accounts_tab.helpers({
    // whether the current user has the permission to see the list of accounts
    canList(){
        return Template.instance().PCK.allowed.get();
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // AccountsList parameters and its additional tabs
    parmsAccountsList(){
        return {
            name: 'users',
            tabs: Template.instance().PCK.tabs
        };
    },

    // AccountNewButton parameters
    parmsNewAccount(){
        return {
            name: 'users',
            tabs: Template.instance().PCK.tabs,
            shape: PlusButton.C.Shape.RECTANGLE
        }
    }
});
