/*
 * pwix:core-app/src/client/components/coreAppMenuButton/coreAppMenuButton.js
 *
 * The toaster button which displays the full menu on rightest of the application header.
 * Events are managed in the 'coreAppLayout' template.
 * 
 * Note: on a small-size display, this menu also embeds login items.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AccountsUI } from 'meteor/pwix:accounts-ui';
import { pwixI18n } from 'meteor/pwix:i18n';
import { UILayout } from 'meteor/pwix:ui-layout';

import './coreAppMenuButton.html';

Template.coreAppMenuButton.onCreated( function(){
    const self = this;

    self.PCK = {
        menuName: CoreApp.configure().mainMenu,
        menuUnits: new ReactiveVar( [], _.isEqual ),
    };

    // build the user menu
    //  set in this user menu only allowed items
    //  permissions are async, but we want keep the defined pages order
    self.autorun(() => {
        Meteor.APP.runContext.getMenu( self.PCK.menuName ).then(( res ) => {
            self.PCK.menuUnits.set( res );
        });
    });

    // track user menu content
    self.autorun(() => {
        //console.debug( 'menuUnits', self.PCK.menuUnits.get());
    });
});

Template.coreAppMenuButton.onRendered( function(){
    const self = this;

    // on small screens, we have this only single menu button
    // if a user is connected, replace the toaster image with the email address
    // just replace the whole HTML code of the button to prevent spurious effects when mixing with jQuery
    self.autorun(() => {
        const button = self.$( '.core-app-menu-button .dropdown button' );
        const btnClass = 'dropdown-toggle d-flex align-items-center';
        let html = '<span class="fa-solid fa-fw fa-bars"></span>';
        if( Meteor.userId() && UILayout.view() === UILayout.C.View.SM ){
            html = '<p>'+AccountsUI.User.firstEmailAddress()+'</p>';
            button.addClass( btnClass );
        } else {
            button.removeClass( btnClass );
        }
        button.html( html );
    });
});

Template.coreAppMenuButton.helpers({
    // a class which qualify the item
    classes( it ){
        return it.get( 'classes' ).join( ' ' )+' item-user';
    },

    // text translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // returns the item label
    label( it ){
        return pwixI18n.label( I18N, it.get( 'menuLabel' ));
    },

    // returns a list of DisplayUnit items displayable in the top menu for a user
    //  the list has been built to only display the allowed items
    userMenu(){
        return Template.instance().PCK.menuUnits.get();
    },

    // return the current version of the application
    version(){
        return( Meteor.settings.public[Meteor.APP.runContext.name()].version );
    }
});
