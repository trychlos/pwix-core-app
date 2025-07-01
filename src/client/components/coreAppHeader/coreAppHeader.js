/*
 * pwix:core-app/src/client/components/coreAppHeader/coreAppHeader.js
 *
 * Manage here the events of the menu button and of the menu header
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AccountsUI } from 'meteor/pwix:accounts-ui';
import { AppPagesI18n } from 'meteor/pwix:app-pages-i18n';
import { pwixI18n } from 'meteor/pwix:i18n';
import { UILayout } from 'meteor/pwix:ui-layout';

import './coreAppHeader.html';

Template.coreAppHeader.onCreated( function(){
    const self = this;

    self.PCK = {
        // whether such component is visible or not, default is true unless otherwise specified
        display: {
        },
        // foreach displayed template, we can specify here the components which are NOT included
        templates: {
            coreSaa: {
                forbidden: [
                    'EDIT_SWITCH',
                    'MENU_BUTTON',
                    'USER_BUTTON'
                ]
            }
        },

        // helpers
        updateRightHeader( template ){
            let header = CoreApp.configure().rightHeader;
            self.PCK.templates[template]?.forbidden.forEach(( it ) => {
                const idx = header.indexOf( it );
                if( idx > -1 ){
                    header.splice( idx, 1 );
                }
            });
            Meteor.APP.runContext.rightHeader( header );
        }
    };
});

Template.coreAppHeader.onRendered( function(){
    const self = this;

    // update the right part of the header
    self.autorun(() => {
        const template = Meteor.APP.runContext.template().template;
        self.PCK.updateRightHeader( template );
    });
});

Template.coreAppHeader.helpers({
    // whether the template should be visible ?
    // this is an AND-ed result with the content of the right header
    display( arg ){
        const it = arg.hash.it;
        let visible = true;
        const PCK = Template.instance().PCK;
        if( PCK.display[it] ){
            visible = PCK.display[it]();
        }
        if( visible ){
            let header = Meteor.APP.runContext.rightHeader();
            const idx = header.indexOf( it );
            if( idx === -1 ){
                visible = true;
            }
        }
        return visible ? 'ui-diblock' : 'ui-dnone';
    },

    // coreAppMenuButton data context
    parmsAppMenu(){
    },

    // AppPagesEditButton data context
    parmsEditButton(){
    },

    // piLanguageSelector data context
    parmsLanguageSelector(){
        return {
            languages: Meteor.APP.C.managedLanguages,
            buttonLabel: pwixI18n.C.BtnLabel.LEFT
        };
    },

    // acUserLogin data context
    parmsUserLogin(){
        return {
            name: 'MyApplication:core-app:core-app-header:user-login',
            initialDisplay: AccountsUI.C.Display.DROPDOWNBUTTON,
            loggedItemsAfter: Meteor.APP.AccountsUI.loggedItemsAfter(),
            //mdClassesContent: Meteor.APP.runContext.pageUIClasses().join( ' ' ),
        };
    },

    // the application title to be displayed in the page header
    title(){
        return Meteor.APP.runContext.title();
    }
});
