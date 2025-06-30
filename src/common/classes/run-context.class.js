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
import { pwixI18n } from 'meteor/pwix:i18n';

export class RunContext extends AppPages.RunContext {

    // static data

    // static methods

    // private data

    // contact email address
    #contact = new ReactiveVar( null );
    // application label
    #label = new ReactiveVar( null );
    // logo path
    #logo = new ReactiveVar( null );
    // sender email address
    #sender = new ReactiveVar( null );

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
                            self.logo( settings.logo || '/favicon.svg' );
                            self.sender( settings.sender || 'AppSender <no-reply@localhost' );
                            self.label( settings.label || self.name());
                        }
                    });
            }
        });

        return this;
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {String} the application contact email address
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
     * @returns {String} the path to the logo
     *  A reactive data souce
     */
    logo( str ){
        if( typeof str !== 'undefined' ){
            this.#logo.set( str );
        }
        return this.#logo.get();
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
     * @locus Anywhere
     * @returns {String} the configured application name
     */
    name(){
        return CoreApp.configure().appName;
    }

    /**
     * Getter/Setter
     * @locus Anywhere
     * @returns {String} the emails sender email address
     *  A reactive data souce
     */
    sender( str ){
        if( typeof str !== 'undefined' ){
            this.#sender.set( str );
        }
        return this.#sender.get();
    }
}

AppPages.RunContext = RunContext;
