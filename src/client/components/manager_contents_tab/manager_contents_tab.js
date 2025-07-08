/*
 * pwix:core-app/src/client/components/manager_contents_tab/manager_contents_tab.js
 *
 * Users management.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AppPagesEdit } from 'meteor/pwix:app-pages-edit';
import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';

import './manager_contents_tab.html';

Template.manager_contents_tab.onCreated( function(){
    const self = this;

    self.PCK = {
        // whether the current user has the permission to see the list of accounts
        allowed: new ReactiveVar( false )
    };

    // whether the current user has the permission to see the list of accounts
    self.autorun(() => {
                self.PCK.allowed.set( true );
                /*
        AppPagesEdit.isAllowed( 'pwix.app_pages_edit.pub.list_all', Meteor.userId())
            .then(( allowed ) => {
                self.PCK.allowed.set( allowed );
            });
            */
    });
});

Template.manager_contents_tab.helpers({
    // whether the current user has the permission to see the list of accounts
    canList(){
        return Template.instance().PCK.allowed.get();
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // AppPagesEditList parameters
    parmsList(){
        return {
            collections: [
                'contents',
                'legals'
            ],
            languages: CoreApp.configure().managedLanguages
        };
    }
});
