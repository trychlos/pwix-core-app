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

import './manager_accounts_tab.html';

Template.manager_accounts_tab.onCreated( function(){
    const self = this;

    self.PCK = {
        // whether the current user has the permission to create a new account
        createAllowed: new ReactiveVar( false ),

        // whether the current user has the permission to see the list of accounts
        listAllowed: new ReactiveVar( false )
    };

    // whether the current user has the permission to create a new account
    self.autorun(() => {
        AccountsManager.isAllowed( 'pwix.accounts_manager.feat.create', Meteor.userId(), { amInstance: AccountsHub.getInstance( 'users' )})
            .then(( allowed ) => {
                self.PCK.createAllowed.set( allowed );
            });
    });

    // whether the current user has the permission to see the list of accounts
    self.autorun(() => {
        AccountsManager.isAllowed( 'pwix.accounts_manager.feat.list', Meteor.userId(), { amInstance: AccountsHub.getInstance( 'users' )})
            .then(( allowed ) => {
                self.PCK.listAllowed.set( allowed );
            });
    });
});

Template.manager_accounts_tab.helpers({
    // whether the current user has the permission to create a new account
    canCreate(){
        return Template.instance().PCK.createAllowed.get();
    },

    // whether the current user has the permission to see the list of accounts
    canList(){
        return Template.instance().PCK.listAllowed.get();
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // AccountsList parameters and its additional tabs
    parmsAccountsList(){
        return {
            name: 'users'
        };
    },

    // AccountNewButton parameters
    parmsNewAccount(){
        return {
            name: 'users',
            shape: PlusButton.C.Shape.RECTANGLE
        }
    }
});
