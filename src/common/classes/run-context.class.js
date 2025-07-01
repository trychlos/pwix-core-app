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
import { EnvSettings } from 'meteor/pwix:env-settings';
import { Tracker } from 'meteor/tracker';

export class RunContext extends AppPages.RunContext {

    // static data

    // static methods

    // private data

    /*
     * from environment settings
     */
    // contact email address
    #contact = new ReactiveVar( null );
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
    // the content of the left part of the header
    #leftHeader = new ReactiveVar( CoreApp.configure().leftHeader, _.isEqual );
    // the content of the right part of the header
    #rightHeader = new ReactiveVar( CoreApp.configure().rightHeader, _.isEqual );
    // the current displayed template and its data
    #template = new ReactiveVar({ template: null, data: null }, _.isEqual );
    // the current tenant entity and validity period
    #tenant = new ReactiveVar({ entity: null, record: null }, _.isEqual );

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
                    .then(( settings ) => {
                        if( settings ){
                            self.contact( settings.contact || 'AppContact <no-reply@localhost' );
                            self.label( settings.label || self.name());
                            self.logo( settings.logo || '/packages/pwix_core-app/resources/favicon.svg' );
                            self.sender( settings.sender || 'AppSender <no-reply@localhost' );
                            self.title( settings.title || self.name());
                        }
                    });
            }
        });

        // trackt the current right header
        Tracker.autorun(() => {
            console.debug( 'pwix:core-app RunContext->rightHeader()', self.rightHeader());
        });

        // trackt the current template and its data
        Tracker.autorun(() => {
            console.debug( 'pwix:core-app RunContext->template()', self.template());
        });

        // trackt the current tenant
        Tracker.autorun(() => {
            console.debug( 'pwix:core-app RunContext->tenant()', self.tenant());
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
     * @returns {Array<String>} the configured left part of the header
     *  A reactive data souce
     */
    leftHeader( array ){
        if( typeof array !== 'undefined' ){
            assert( array && _.isArray( array ), 'expect an array, got '+array );
            this.#leftHeader.set( array );
        }
        return this.#leftHeader.get();
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {Array<String>} the configured right part of the header
     *  A reactive data souce
     */
    rightHeader( array ){
        if( typeof array !== 'undefined' ){
            assert( array && _.isArray( array ), 'expect an array, got '+array );
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
     * @param entity the tenant entity
     * @param record the current tenant validity period
     * @returns {Object} the computed current { entity, record } object
     *  In single-tenant mode (where we do not manage validity periods), we still have at least an entity
     *  A reactive data souce
     */
    tenant( entity, record ){
        if( typeof entity !== 'undefined' ){
            this.#tenant.set({ entity: entity, record: record });
        }
        return this.#tenant.get();
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
}

AppPages.RunContext = RunContext;
