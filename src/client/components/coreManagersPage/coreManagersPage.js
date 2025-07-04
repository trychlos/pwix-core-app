/*
 * pwix:core-app/src/client/components/coreManagersPage/coreManagersPage.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AccountsHub } from 'meteor/pwix:accounts-hub';
import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';
import { TenantsManager } from 'meteor/pwix:tenants-manager';

import '../manager_accounts_tab/manager_accounts_tab.js';
import '../manager_tenants_tab/manager_tenants_tab.js';

import './coreManagersPage.html';
import './coreManagersPage.less';

Template.coreManagersPage.onCreated( function(){
    const self = this;

    self.PCK = {
        accounts: {
            allowed: new ReactiveVar( false )
        },
        tenants: {
            allowed: new ReactiveVar( false )
        },
        contents: {
            allowed: new ReactiveVar( false )
        }
    };

    // whether the user is allowed to accounts manager ?
    self.autorun(() => {
        AccountsManager.isAllowed( 'pwix.accounts_manager.feat.list', Meteor.userId(), { amInstance: AccountsHub.instances.users })
            .then(( allowed ) => {
                self.PCK.accounts.allowed.set( allowed );
            });
    });

    // whether the user is allowed to tenants manager ?
    self.autorun(() => {
        if( TenantsManager.configure().enabled ){
            TenantsManager.isAllowed( 'pwix.tenants_manager.pub.list_all', Meteor.userId())
                .then(( allowed ) => {
                    self.PCK.tenants.allowed.set( allowed );
                });
        }
    });

    // whether the user is allowed to contents manager ?
    self.autorun(() => {
    });
});

Template.coreManagersPage.helpers({
    parmsTabbed(){
        let tabs = [];
        if( Template.instance().PCK.accounts.allowed.get()){
            tabs.push({
                navLabel: pwixI18n.label( I18N, 'manager.accounts.tab_title' ),
                paneTemplate: 'manager_accounts_tab'
            });
        }
        if( Template.instance().PCK.tenants.allowed.get()){
            tabs.push({
                navLabel: pwixI18n.label( I18N, 'manager.tenants.tab_title' ),
                paneTemplate: 'manager_organizations_tab'
            });
        }
        console.debug( 'tabs', tabs );
        return {
            name: 'coreManagersPage',
            tabs: tabs
        };
    }
});
