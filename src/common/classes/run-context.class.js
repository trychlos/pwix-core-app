/*
 * pwix:core-app/src/common/classes/run-context.class.js
 *
 * Provides some common semantics to the application:
 * - configured:
 *   > name
 * - from environment settings
 *   > title
 *   > sender
 *   > contact
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AppPages } from 'meteor/pwix:app-pages';
import { Logger } from 'meteor/pwix:logger';
import { EnvSettings } from 'meteor/pwix:env-settings';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Permissions } from 'meteor/pwix:permissions';
import { Tracker } from 'meteor/tracker';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

const logger = Logger.get();

export class RunContext extends AppPages.RunContext {

    // static data

    /*
     * from environment settings
     */
    // contact email address
    #contact = new ReactiveVar( null );
    // copyright
    #copyright = new ReactiveVar( null );
    // application label
    #label = new ReactiveVar( null );
    // logo path
    #logo = new ReactiveVar( null );
    // sender email address
    #sender = new ReactiveVar( null );
    // application title
    #title = new ReactiveVar( null );

    /*
     * computed at runtime
     */
    // the content of the right part of the header
    #rightHeader = new ReactiveVar( CoreApp.C.RightHeader, _.isEqual );
    // the current displayed template and its data
    #template = new ReactiveVar({ template: null, data: null }, _.isEqual );

    // private methods

    // public data

    /**
     * Constructor
     * @param {Object} o an optional parameters object
     * @returns {RunContext} this instance
     */
    constructor(){
        super( ...arguments );
        const self = this;

        // get the application title from settings per environment
        Tracker.autorun(() => {
            if( EnvSettings.ready()){
                EnvSettings.environmentSettings()
                    .then(( res ) => {
                        const settings = res?.settings;
                        if( settings ){
                            self.contact( settings.contact || 'AppContact <no-reply@localhost' );
                            self.copyright( settings.copyright || '' );
                            self.label( settings.label || self.name());
                            self.logo( settings.logo || '/packages/pwix_core-app/resources/svg/favicon.svg' );
                            self.sender( settings.sender || 'AppSender <no-reply@localhost' );
                            self.title( settings.title || self.name());
                        }
                    });
            }
        });

        // trackt the current right header
        Tracker.autorun(() => {
            //logger.debug( 'pwix:core-app RunContext->rightHeader()', self.rightHeader());
        });

        // trackt the current template and its data
        Tracker.autorun(() => {
            //logger.debug( 'pwix:core-app RunContext->template()', self.template());
        });

        // trackt the current tenant
        Tracker.autorun(() => {
            //logger.debug( 'pwix:core-app RunContext->tenant()', self.tenant());
        });

        return this;
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {String} the application contact email address, read from environment settings
     *  A reactive data souce
     */
    contact( str ){
        if( typeof str !== 'undefined' ){
            this.#contact.set( str );
        }
        return this.#contact.get();
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {String} the application copyright, read from environment settings
     *  A reactive data souce
     */
    copyright( str ){
        if( typeof str !== 'undefined' ){
            this.#copyright.set( str );
        }
        return this.#copyright.get();
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {String} the label of the application, read from the environment settings
     *  A reactive data souce
     */
    label( str ){
        if( typeof str !== 'undefined' ){
            this.#label.set( str );
        }
        return this.#label.get();
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {String} the path to the logo, read from environment settings
     *  A reactive data souce
     */
    logo( str ){
        if( typeof str !== 'undefined' ){
            this.#logo.set( str );
        }
        return this.#logo.get();
    }

    /**
     * @locus Anywhere
     * @returns {String} the configured application name
     */
    name(){
        return CoreApp.configure().appName;
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {Array<String>} the configured right part of the header
     *  A reactive data souce
     */
    rightHeader( array ){
        if( typeof array !== 'undefined' ){
            assert( array && _.isArray( array ), 'expects an array, got '+array );
            this.#rightHeader.set( array );
        }
        return this.#rightHeader.get();
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {String} the emails sender email address, read from environment settings
     *  A reactive data souce
     */
    sender( str ){
        if( typeof str !== 'undefined' ){
            this.#sender.set( str );
        }
        return this.#sender.get();
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @param template the template name
     * @param data the template data
     * @returns {Object} the computed current { template, data } object 
     *  A reactive data souce
     */
    template( template, data ){
        if( typeof template !== 'undefined' ){
            this.#template.set({ template: template, data: data });
        }
        return this.#template.get();
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {String} the title of the application, read from the environment settings
     *  A reactive data souce
     */
    title( str ){
        if( typeof str !== 'undefined' ){
            this.#title.set( str );
        }
        return this.#title.get();
    }

    /**
     * @locus Anywhere
     * @access public
     * @param {String} name the current page
     * @returns {Boolean} true if the current user is allowed to the current page
     */
    async validate( name, opts={} ){
        // make sure the current user is allowed
        const displaySet = AppPages.displaySet.get();
        const unit = displaySet.byName( name );
        const wantPermission = unit.get( 'wantPermission' );
        return !wantPermission || await Permissions.isAllowed( wantPermission );
    }
}

AppPages.RunContext = RunContext;
