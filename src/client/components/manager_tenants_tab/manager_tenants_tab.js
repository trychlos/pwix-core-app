/*
 * pwix:core-app/src/client/components/manager_tenants_tab/manager_tenants_tab.js
 *
 * Organizations management.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { PlusButton } from 'meteor/pwix:plus-button';
import { pwixI18n } from 'meteor/pwix:i18n';
import { TenantsManager } from 'meteor/pwix:tenants-manager';
import { ReactiveVar } from 'meteor/reactive-var';

import './manager_tenants_tab.html';

Template.manager_tenants_tab.onCreated( function(){
    const self = this;

    self.PCK = {
        // whether the user is allowed to create
        createAllowed: new ReactiveVar( false ),

        // whether the user is allowed to list
        listAllowed: new ReactiveVar( false )
    };

    // whether the user is allowed to create
    self.autorun(() => {
        TenantsManager.isAllowed( 'pwix.tenants_manager.feat.create' ).then(( allowed ) => { self.PCK.createAllowed.set( allowed ); });
    });

    // whether the user is allowed to list
    self.autorun(() => {
        TenantsManager.isAllowed( 'pwix.tenants_manager.feat.list' ).then(( allowed ) => { self.PCK.listAllowed.set( allowed ); });
    });
});

Template.manager_tenants_tab.helpers({
    // whether the current user has the permission to create a new tenant
    canCreate(){
        const allowed = Template.instance().PCK.createAllowed.get();
        return allowed;
    },

    // whether the current user has the permission to see the list of tenants
    canList(){
        const allowed = Template.instance().PCK.listAllowed.get();
        return allowed;
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // TenantNewButton parameters
    // disable the clients and accounts tabs for new tenant
    parmsTenantNew(){
        return {
            shape: PlusButton.C.Shape.RECTANGLE,
            mdClasses: 'modal-xxl'
        };
    },

    // TenantsList parameters
    parmsTenantsList(){
        return {
            mdClasses: 'modal-xxl'
        };
    }
});
