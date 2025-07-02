/*
 * pwix:core-app/src/client/layouts/coreAppLayout/coreAppLayout.js
 *
 * Just below the coreAppMain topmost component, this one takes care of:
 *  - display or not the application header
 *  - managing the app admin at startup if needed
 *  - managing the user login if needed
 *  - display or not the application footer
 *  - dynamically load the required template
 *  - automatically compute and provide a display layout adapted to the display size
 *  - manage the events which bubble up until here.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Modal } from 'meteor/pwix:modal';

import './coreAppLayout.html';

Template.coreAppLayout.onCreated( function(){
    const self = this;
    //console.debug( this );

    self.PCK = {
        saa: {
            havePackage: new ReactiveVar( false ),
            isPackageReady: new ReactiveVar( false ),
            wantDisplay: new ReactiveVar( false )
        },
        tenants: {
            havePackage: new ReactiveVar( false ),
            isPackageReady: new ReactiveVar( false ),
            wantDisplay: new ReactiveVar( false )
        }
    };

    // whether we have the SAA package ?
    // as of pwix:core-app v1.x, pwix:startup-app-admin is always included
    self.autorun(() => {
        self.PCK.saa.havePackage.set( Package['pwix:startup-app-admin'] !== undefined );
    });

    // whether we have the TenantsManager package ?
    // as of pwix:core-app v1.x, pwix:tenants-manager is always included
    self.autorun(() => {
        self.PCK.tenants.havePackage.set( Package['pwix:tenants-manager'] !== undefined );
    });
});

Template.coreAppLayout.onRendered( function(){
    const self = this;
    //console.debug( this );

    // if we have the SAA package, is it ready ?
    self.autorun(() => {
        self.PCK.saa.isPackageReady.set( self.PCK.saa.havePackage.get() && Package['pwix:startup-app-admin'].SAA.ready());
    });

    // if we have the SAA package and it is ready, do we want display the admin creation panel ?
    self.autorun(() => {
        self.PCK.saa.wantDisplay.set( self.PCK.saa.isPackageReady.get() && Package['pwix:startup-app-admin'].SAA.countAdmins.get() === 0 );
    });

    // if we have the TenantsManager package, is it ready ?
    // as of pwix:tenants-manager v1.x, the package is always considered as ready (there is no ready() function)
    self.autorun(() => {
        //self.PCK.tenants.isPackageReady.set( self.PCK.tenants.havePackage.get() && Package['pwix:tenants-manager'].TenantsManager.ready());
        self.PCK.tenants.isPackageReady.set( self.PCK.tenants.havePackage.get() && true );
    });

    // if we have the TenantsManager package (and it is ready), do we want display the tenant selector ?
    self.autorun(() => {
        //self.PCK.saa.wantDisplay.set( self.PCK.saa.isPackageReady.get() && Package['pwix:startup-app-admin'].SAA.countAdmins.get() === 0 );
    });

    // compute the to-be-displayed template
    const forceSAA = false;
    const forceLogin = false;

    self.autorun(() => {
        // application doesn't have defined yet its administrator - let define it now
        // remove menu and user buttons from header
        if( self.PCK.saa.wantDisplay.get() || forceSAA ){
            Meteor.APP.runContext.template( 'coreSaa' );

        // we have our application administrator
        // do we need to connect the user ?
        } else {
            const page = Meteor.APP.runContext.currentPage();
            assert( page && page instanceof AppPages.DisplayUnit, 'expect an instance of AppPages.DisplayUnit, got '+page );
            const wantLogin = page.get( 'wantPermission' );
            if( wantLogin || forceLogin ){
                if( Meteor.userId() && !forceLogin ){
                    const wantScope = page.get( 'wantScope' );
                    const tenant = Meteor.APP.runContext.tenant();
                    if( wantScope ){
                        if( tenant.entity?._id ){
                            Meteor.APP.runContext.template( page.get( 'template' ), page.get( 'templateParms' ));
                        } else {
                            // want scope
                            console.warn( 'the page requires a scope, but none is currently set, back to home' );
                            FlowRouter.go( '/' );
                        }
                    } else {
                        Meteor.APP.runContext.template( page.get( 'template' ), page.get( 'templateParms' ));
                    }
                } else {
                    // the asked page wants an identified user, but nobody is connected -> force a login page
                    Meteor.APP.runContext.template( 'coreLogin' );
                }
            } else {
                Meteor.APP.runContext.template( page.get( 'template' ), page.get( 'templateParms' ));
            }
        }
    });
});

Template.coreAppLayout.helpers({
    // write the name of the theme of the page as a class name
    colorTheme(){
        return Meteor.APP.runContext.currentPage().get( 'colorTheme' ) || CoreApp.configure().colorTheme;
    },

    // the current computed template data
    data(){
        return Meteor.APP.runContext.template().data;
    },

    // write the name of the theme of the page as a class name
    layoutTheme(){
        return Meteor.APP.runContext.currentPage().get( 'layoutTheme' ) || CoreApp.configure().layoutTheme;
    },

    // the current computed template name
    template(){
        return Meteor.APP.runContext.template().template;
    },

    // whether we want display the page footer
    wantFooter(){
        return Meteor.APP.runContext.wantFooter();
    },

    // whether we want display the page header
    wantHeader(){
        return Meteor.APP.runContext.wantHeader();
    },
});

Template.coreAppLayout.events({

    // click on a dropdown item
    'click .dropdown-item'( event, instance ){
        // if have an id, do we know it ?
        const id = $( event.currentTarget ).attr( 'id' );
        let done = false;
        switch( id ){
            case 'core-app-roles-item':
                Blaze.renderWithData( Template.prView, {
                    //mdClassesContent: Meteor.APP.runContext.iAppPageableCurrent().get( 'theme' ),
                }, $( 'body' )[0] );
                done = true;
                break;
        }
        // if we have 'item-user' or 'item-manager' classes
        if( !done && $( event.currentTarget ).hasClass( 'item-user' )){
            FlowRouter.go( id );
            done = true;
        }
        if( !done && $( event.currentTarget ).hasClass( 'item-manager' )){
            FlowRouter.go( id );
            done = true;
        }
        if( !done && $( event.currentTarget ).hasClass( 'item-modal' )){
            const page = Meteor.APP.displaySet.byName( id );
            const parms = {
                mdBody: page.get( 'template' ),
                mdClasses: 'modal-lg',
                //mdClassesContent: page.get( 'theme' )
            };
            const parms_a = page.get( 'templateParms' );
            const parms_b = parms_a ? ( _.isFunction( parms_a ) ? parms_a() : parms_a ) : null;
            if( parms_b ){
                _.merge( parms, parms_b );
            }
            Modal.run( parms );
            done = true;
        }
        // doesn't stop propagation to let Bootstrap close the menu
        //return !done;
    },

    // user asks for the cookies policy
    'cm-policy-click .cmSliding'( event, instance ){
        FlowRouter.go( 'lm_cookies' );
    }
});
