/*
 * /imports/common/classes/layout.class.ts
 *
 * The layout to be used to display the UI.
 * Can be automatically computed (cf. app_layout component) or set by any source.
 * When set by an identified source, then automatic computing is ignored
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Tracker } from 'meteor/tracker';

export class Layout {

    // static data

    static Def = {
        C: {
            AUTO: 'automatic',
            DEFAULT: 'default'
        },
        Layouts: {
            default: 'app_loading',
            desktop: 'app_desktop_layout'
        }
    }

    // static methods

    /**
     * 
     * @param {*} definition 
     */
    static checkData( definition ){

    }

    // private data

    // a dependency
    #dep = new Tracker.Dependency();

    // the current layout
    // may have been automatically computed, or forced by the user (when source='user')
    #name = null;
    #source = null;

    // private methods

    // public data

    /**
     * Constructor
     * Arguments are optional here.
     * @param {String} name the name of the layout (as a key of Layout.AvailableLayouts object)
     * @param {Object} opts an optional options object with following keys:
     *  - source<String>: when set, the source which has decided to set this layout
     *    if unset of 'automatic', then only applies if previous source was also unset or 'automatic'
     * @returns {Layout} this instance
     */
    constructor(){
        // todo: externalze this definition (and so this checkData() call)
        Layout.checkData( Layout.Def );

        // if arguments, treat them
        if( arguments.length ){
            this.set( ...arguments );
        }
        return this;
    }

    /**
     * @summary Returns the name associated with the current layour
     * @returns {string} the layout's name, maybe null
     */
    name(){
        console.debug( 'Layout.name()', this.#name );
        return this.#name;
    }

    /**
     * @summary Sets the current layout to be applied
     * @param {String} name the name of the layout (as a key of Layout.AvailableLayouts object)
     * @param {Object} opts an optional options object with following keys:
     *  - source<String>: when set, the source which has decided to set this layout
     *    if unset of 'automatic', then only applies if previous source was also unset or 'automatic'
     * @returns {String} the reason for why this new layout has not been set, or a falsy string
     */
    set( name, opts ){
        assert.ok( name && typeof( name ) === 'string', 'Layout.set() name=\''+( name || '(undef)' )+'\' must be a non-empty string' );
        // silently ignore a try to reset the same layout
        if( name === this.#name ){
            return;
        }
        // make sure the name addresses a defined layout
        if( !Layout.Def.Layouts[name] ){
            return 'Layout.set() name=\''+name+'\' must identify a key of Layout.Def.Layouts object: ['+( Object.keys( Layout.Def.Layouts ).join( ',' ))+']';
        }
        // make sure we do not try to replace a user-set layout by an automatically computed one
        let reason;
        if( !opts || !opts.source || opts.source === Layout.Def.C.AUTO ){
            const previousSource = this.#source;
            if( previousSource && previousSource !== Layout.Def.C.AUTO ){
                return 'Layout.set() refusing to replace a \''+previousSource+'\'-set layout with a computed one';
            }
        }
        // at last set the layout
        console.debug( 'Layout.set()', name, opts );
        this.#name = name;
        this.#source = opts?.source || null;
        this.#dep.changed();
        return reason;
    }

    /**
     * @summary Returns the template associated with the current layour
     * @returns {string} the template to be applied, defaulting to 'default' value if it exists, else undefined
     *  A reactive data source.
     */
    template(){
        // mark this function as a dependency
        this.#dep.depend();
        // and try to find a valid template
        let template;
        // if we have a name, we are almost sure the template has been defined
        if( this.#name ){
            template = Layout.Def.Layouts[this.#name];
        }
        if( !template && Layout.Def.C.DEFAULT ){
            template = Layout.Def.Layouts[Layout.Def.C.DEFAULT];
        }
        if( !template ){
            console.error( 'Layout.template() unable to determine a default value' );
        }
        console.debug( 'Layout.template()', template );
        return template;
    }
}
