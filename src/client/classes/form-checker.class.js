/*
 * /src/client/classes/form-checker.class.js
 *
 * This client-only class manages the input checks inside of a form.
 * It is is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 * 
 * This class aims to be able to manage static forms as well as array and dynamics. Remind so that there may NOT be a one-to-one relation
 * between a field definition and a DOM element.
 * 
 * Notes:
 *  - The class defines:
 *      - a local 'check_<field>( [opts] })' function for each field which returns a Promise which resolves to a validity boolean for the relevant field
 *      - a local 'check( [opts] )' function which returns a Promise which resolves to a validity boolean for the whole form.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict; // up to nodejs v16.x

import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var';

import { YesNo } from '../../common/definitions/yesno.def.js';

import { TypedMessage } from '../../common/classes/typed-message.class.js';

export class FormChecker {

    // static data

    // static methods

    // private data

    #priv = null;

    // private methods

    // compute the checked type (in the sense of FieldCheck)
    _computeCheck( eltData, err ){
        let check = 'NONE';
        if( err ){
            switch( err.type()){
                case TypedMessage.C.ERROR:
                    check = 'INVALID';
                    break;
                case TypedMessage.C.WARNING:
                    check = 'UNCOMPLETE';
                    break;
            }
        } else if( eltData.defn.type ){
            switch( eltData.defn.type ){
                case 'INFO':
                    check = 'NONE';
                    break;
                default:
                    check = 'VALID';
                    break
            }
        }
        return check;
    }

    // return the check function name
    //  this is usually check_.<field>
    //      unless the application has asked to insert a 'fnPrefix'
    //      unless a parent appears
    _computeCheckFname( field, defn, parent ){
        let fn = 'check_';
        if( parent ){
            fn += parent + '_';
        }
        if( this.#priv.fnPrefix ){
            fn += this.#priv.fnPrefix;
        }
        fn += field;
        return fn;
    }

    // an error message returned by the check function is only considered a validity error if it is of type ERROR
    //  else keep it cool
    _computeValid( eltData, err ){
        let valid = true;
        if( this.#priv.validfn ){
            valid = this.#priv.validfn( err, field );
        } else {
            valid = !err || err.type() !== TypedMessage.C.ERROR;
        }
        //console.debug( 'err', err, 'field', field, 'valid', valid );
        return valid;
    }


    // at construction time, define the check_xx local check functions
    //  this local check function will always call the corresponding checksObj function (if exists)
    //  returns a Promise which resolve to 'valid' status for the field
    //  (while the checksObj check_<field>() is expected to return a Promise which resolves to a TypedMessage or null)

    // + attach to the DOM element addressed by the 'js' key an object:
    //   - value: a ReactiveVar which contains the individual value got from the form
    //   - checked: a ReactiveVar which contains the individual checked type (in the sense of FieldCheck class)
    //   - field: the field name
    //   - defn: the field definition
    //   - fn: the check function name
    //   - parent: if set, the parent field name

    _defineLocalFunction( args, field, defn, parent=null ){
        const self = this;
        // function is named check_label() or check_emails_label() depending if we have children fields
        const fn = self._computeCheckFname( field, defn, parent );
        if( !_.isFunction( self.#priv.checksObj[fn] )){
            Meteor.isDevelopment && console.warn( '[DEV] \''+fn+'()\' is not defined in provided checks object' );
        }
        // local check function must be called with element dom data
        self[fn] = function( eltData, opts={} ){
            if( eltData.$js.length ){
                eltData.$js.removeClass( 'is-valid is-invalid' );
            }
            const value = self._valueFrom( eltData, opts );
            eltData.value.set( value );
            // this local function returns a Promise which resolves to a validity boolean
            return Promise.resolve( true )
                .then(() => {
                    // the checksObj function returns a Promise which resolves to a TypedMessage or null
                    return _.isFunction( self.#priv.checksObj[fn] ) ? self.#priv.checksObj[fn]( value, self.#priv.data, opts ) : null;
                })
                .then(( err ) => {
                    check( err, Match.OneOf( null, CoreUI.TypedMessage ));
                    const valid = self._computeValid( eltData, err );
                    self.#priv.valid.set( valid );
                    // manage different err types
                    if( err && opts.msgerr !== false ){
                        this._pushMessage( err );
                    }
                    if( eltData.defn.post ){
                        eltData.defn.post( err );
                    }
                    const checked_type = this._computeCheck( eltData, err );
                    //console.debug( field, 'err', err, 'checked_type', checked_type );
                    eltData.checked.set( checked_type );
                    // set valid/invalid bootstrap classes
                    if( defn.display !== false && self.#priv.useBootstrapValidationClasses === true && $js.length ){
                        $js.addClass( valid ? 'is-valid' : 'is-invalid' );
                    }
                    return valid;
                });
        };
        // end_of_function
        // needed by inputHandler so that we can get back our FormChecker data for this field from the event.target
        //  take care of having one and only target DOM element for this definition at this time
        const $js = defn.js ? self.#priv.instance.$( defn.js ) : null;
        if( $js.length === 1 ){
            this._domDataSet( $js, field, defn, parent );
        }
        return true;
    }

    // search a field (and its field definition) when receiving an input event through the inputHandler()
    //  maybe we already have set the data here, else find the correct DOM element and initialize the data object
    //  returns the elementData or null
    _domDataByEvent( event, opts ){
        const $target = this.#priv.instance.$( event.target );
        let data = $target.data( 'form-checker' );
        if( !data ){
            data = null;
            const cb = function( args, field, defn, parent ){
                ( $target.attr( 'class' ).split( /\s+/ ) || [] ).every(( c ) => {
                    const _selector = '.'+c;
                    const _words = defn.js.split( ' ' );
                    if( _words.includes( _selector )){
                        this._domDataSet( $target, field, defn, parent );
                        data = $target.data( 'form-checker' );
                    }
                    return data === null;
                });
                return data === null;
            };
            this._fieldsIterate( cb );
        }
        return data;
    }

    // search a field (and its dom data) by the field name
    //  returns elementData or null
    _domDataByField( field, opts ){
        const self = this;
        let data = null;
        let found = false;
        const cb = function( args, f, defn, parent ){
            if( f === field ){
                found = true; 
                if( defn.js ){
                    const $js = self.#priv.instance.$( defn.js );
                    if( $js.length === 1 ){
                        data = $js.data( 'form-checker' );
                    }
                }
            };
            return found === false;
        };
        this._fieldsIterate( cb );
        return data;
    }
    
    // set our FormChecker data against the targeted DOM element
    //  this data may be set at construction time if field already exists
    //  or at input time
    _domDataSet( $elt, field, defn, parent ){
        $elt.data( 'form-checker', {
            field: field,
            defn: defn,
            parent: parent,
            fn: this._computeCheckFname( field, defn, parent ),
            value: new ReactiveVar( null ),
            checked: new ReactiveVar( null ),
            $js: $elt
        });
    }
    
    // push the message inside the form or call the corresponding function
    //  'err' here should be a TypedMessage
    _pushMessage( err ){
        if( this.#priv.$err ){
            this.#priv.$err.html( err ? ( _.isString( err ) ? err : err.message ) : '&nbsp;' );
        }
        if( this.#priv.errfn ){
            this.#priv.errfn( err );
        }
    }

    // iterate on each field definition, calling the provided 'cb' callback for each one
    //  when 'children' are defined, iterate on the children
    //  the recursive iteration stops as soon as the 'cb' doesn't return true
    _fieldsIterate( cb, args=null ){
        const self = this;
        const _fields_iterate_f = function( args, field, defn, parent=null ){
            if( defn.children ){
                Object.keys( defn.children ).every(( f ) => {
                    return _fields_iterate_f( args, f, defn.children[f], field );
                });
            } else {
                return cb.bind( self )( args, field, defn, parent );
            }
        };
        Object.keys( this.#priv.fields ).every(( f ) => {
            return _fields_iterate_f( args, f, this.#priv.fields[f] );
        });
    }
    
    // get the value from the form
    //  when are dealing with children, the options may hold a '$parent' which includes all the fields of the array
    _valueFrom( eltData, opts ){
        const tagName = eltData.$js.prop( 'tagName' );
        const eltType = eltData.$js.attr( 'type' );
        let value;
        if( tagName === 'INPUT' && eltType === 'checkbox' ){
            value = eltData.$js.prop( 'checked' );
        } else {
            value = eltData.$js.val() || '';
            // a small hack to handle 'true' and 'false' values from coreYesnoSelect
            const $select = eltData.$js.closest( '.core-yesno-select' );
            if( $select.length ){
                if( value === 'true' || value === 'false' ){
                    value = ( value === 'true' );
                }
            }
        }
        return value;
    }

    // set the value from the item to the form field according to the type of field
    _valueTo( eltData, item ){
        let value = null;
        if( eltData.defn.val ){
            value = eltData.defn.val( item );
        } else {
            value = item[eltData.field];
        }
        const tagName = eltData.$js.prop( 'tagName' );
        const eltType = eltData.$js.attr( 'type' );
        if( tagName === 'INPUT' && eltType === 'checkbox' ){
            eltData.$js.prop( 'checked', value );
        } else {
            const $select = eltData.$js.closest( '.core-yesno-select' );
            if( $select.length ){
                const def = YesNo.byValue( value );
                if( def ){
                    eltData.$js.val( YesNo.id( def ));
                }
            } else {
                eltData.$js.val( value );
            }
        }
    }

    // protected methods

    // public data

    /**
     * Constructor
     * 
     * @summary
     *  Instanciates a new FormChecker instance.
     *  Should be called from Template.onRendered() function
     * 
     * @param {Object} o an object with following keys:
     *  - instance: the calling Blaze.TemplateInstance instance
     * 
     *  - checksObj: an object which holds the check_<field>() functions:
     *      Proto is: <checksObj>.check_<field>( value, data, opts ) which returns a Promise which resolves to a TypedMessage or null
     *      > value is the current value of the field
     *      > data is an object passed-in by the application when instanciating the FormChecker
     *      > opts is provided by this FormChecker instance with following keys:
     *          - display: if set, whether or not having a UI feedback, defaulting to true
     *          - update: if set, whether or not update the current item (for example, do not update when re-checking all fields)
     * 
     *  - fnPrefix: if set, a string which prefixes the field name when addressing the 'checksObj.check_<field>()' check function
     *      e.g. for 'foo' field, the check function is expected to be 'check_foo()'
     *          if fnPrefix is 'bar_', then the check function becomes 'check_bar_foo()'
     * 
     *  - fields: a hash which defines the fields to be checked, where:
     *      <key> the name of the field in the provided item
     *      <value> is a hash wih following keys:
     *          - js: the jQuery CSS selector for the INPUT/SELECT/TEXTAREA field in the DOM
     *          - display: whether the field should be updated to show valid|invalid state, default to true
     *          - val: a function to get the value from the provided item, defaulting to just getting the field value
     *          - post: a function to be called after check with the TypedMessage result of the corresponding 'checksObj.check_<field>()' function
     * 
     *  - $ok: if set, the jQuery object which defines the OK button (to enable/disable it)
     *  - okfn: if set, a function to be called when OK button must enabled / disabled
     *  - $err: if set, the jQuery object which defines the error message place
     *  - errfn: if set, a function to be called to display an error message
     * 
     *  - errclear: if set, a function to be called to clear all messages
     *      Because we re-check all fields on each input event, also each input event re-triggers all error messages
     *      So this function to let the application re-init its error messages stack.
     * 
     *  - data: if set, an object which will be passed to every '<checksObj>.check_<fn>()' function
     * 
     *  - useBootstrapValidationClasses: defaulting to false
     * 
     *  - validfn: if set, a function which computes the validity status of the form depending of the returned value of each check function
     *      Proto is: validfn( err<TypedMessage>, field<String>, defn<Object> ) returns the validity status as a Boolean
     *      default is that only messages of type ERROR are said invalid
     * 
     *  Deprecated keys:
     *  - collection: an object which holds the check_<field> functions, now renamed 'checksObject'
     * 
     * @returns {FormChecker} a FormChecker object
     */
    constructor( o ){
        const self = this;

        assert( o, 'expected an Object argument' );
        assert( o.instance instanceof Blaze.TemplateInstance, 'instance is not a Blaze.TemplateInstance');
        assert(( o.checksObj && _.isObject( o.checksObj )) || ( o.collection && _.isObject( o.collection )), 'nor checksObj neither collection are provided or are an object' );
        assert( !o.$ok || o.$ok.length > 0, 'when provided, $ok must be set to a jQuery object' );
        assert( !o.okfn || _.isFunction( o.okfn ), 'when provided, okfn must be a function' );
        assert( !o.$err || o.$err.length > 0, 'when provided, $err must be set to a jQuery object' );
        assert( !o.errfn || _.isFunction( o.errfn ), 'when provided, errfn must be a function' );
        assert( o.fields && Object.keys( o.fields ).length > 0, 'fields must be a non-empty object' );

        // keep the provided params
        //  + define a ReactiveVar for this instance which will hold the item validity status
        this.#priv = {
            // the parameters
            instance: o.instance,
            checksObj: o.checksObj || o.collection,
            fnPrefix: o.fnPrefix || '',
            fields: o.fields,
            $ok: o.$ok || null,
            okfn: o.okfn || null,
            $err: o.$err || null,
            errfn: o.errfn || null,
            errclear: o.errclear || null,
            data: o.data || {},
            useBootstrapValidationClasses: false,
            validfn: o.validfn || null,
            // our internal vars
            valid: new ReactiveVar( false )
        };
        if( _.isBoolean( o.useBootstrapValidationClasses )){
            this.#priv.useBootstrapValidationClasses = o.useBootstrapValidationClasses;
        }

        // define an autorun which will enable/disable the OK button depending of the validity status
        o.instance.autorun(() => {
            const valid = self.#priv.valid.get();
            if( self.#priv.$ok ){
                self.#priv.$ok.prop( 'disabled', !valid );
            }
            if( self.#priv.okfn ){
                self.#priv.okfn( valid, this.#priv.data );
            }
        });

        // for each field to be checked, define its own internal check function
        this._fieldsIterate( this._defineLocalFunction );

        //console.debug( this );
        return this;
    }

    /**
     * @summary a general function which check each field successively
     * @param {Object} opts an option object with following keys:
     *  - field: if set, indicates a field to not check (as just already validated from an input handler)
     *  - display: if set, then says whether checks have any effect on the display, defaulting to true
     *  - msgerr: if set, says if error message are to be displayed, defaulting to true
     *  - update: if set, then says whether the value found in the form should update the edited object, defaulting to true
     *  - $parent: if set, a jQuery element which acts as the parent of the form
     * @returns a Promise which eventually resolves to the global validity status
     */
    check( opts={} ){
        let valid = true;
        let promises = [];
        const self = this;
        this._fieldsIterate(( args, field, defn, parent ) => {
            if( defn.js ){
                let $js = null;
                if( opts.$parent ){
                    $js = opts.$parent.find( defn.js );
                } else {
                    $js = self.#priv.instance.$( defn.js );
                }
                if( $js && $js.length === 1 ){
                    eltData = $js.data( 'form-checker' );
                    if( !eltData ){
                        this._domDataSet( $js, field, defn, parent );
                        eltData = $js.data( 'form-checker' );
                    }
                    if( eltData ){
                        promises.push( self[ eltData.fn ]( eltData, opts )
                            .then(( v ) => {
                                valid = valid && v;
                            })
                        );
                    } else {
                        Meteor.isDevelopment && console.warn( field, 'eltData not set' );
                    }
                }
            }
            return true;
        });
        return Promise.allSettled( promises )
            .then(() => {
                if( opts.display === false ){
                    self.clear();
                }
                return Promise.resolve( valid );
            });
    }

    /**
     * @summary Clears the validity indicators
     */
    clear(){
        const self = this;
        Object.keys( self.#priv.fields ).every(( f ) => {
            self.#priv.instance.$( self.#priv.fields[f].js ).removeClass( 'is-valid is-invalid' );
            return true;
        });
        // also clears the error messages if any
        if( self.#priv.errclear ){
            self.#priv.errclear();
        }
    }

    /**
     * @returns {Object} data
     */
    getData(){
        return this.#priv.data;
    }

    /**
     * @param {String} field the name of the field we are interested of
     * @returns {String} the corresponding current FieldCheck type
     */
    getFieldCheck( field ){
        const eltData = this._domDataByField( field );
        let ret = null;
        if( eltData ){
            ret = eltData.checked.get();
        } else {
            Meteor.isDevelopment && console.warn( 'unintialized', field );
        }
        return ret;
    }

    /**
     * @returns {Object} with data from the form
     */
    getForm(){
        const self = this;
        let o = {};
        Object.keys( self.#priv.fields ).every(( f ) => {
            o[f] = self.#priv.instance.$( self.#priv.fields[f].js ).val();
            return true;
        });
        return o;
    }

    /**
     * @summary input event handler
     * @param {Object} event the Meteor event
     * @param {Object} opts an options object with following keys:
     *  - id: in case of array'ed fields, the id of the item
     *  - $parent: in case of dynamic fields, a DOM jQuery element which is a parent of this form
     *  - autorun_check: whether the application already has a check() in an autorun, so that global re-check() here would be useless, defaulting to true
     * 
     * The principle is that:
     * 1. we check the input field identified by its selector
     *      the check function put itself an error message if not ok
     * 2. if ok, we check all fields (but this one)
     * 
     * @returns {Promise} which eventually resolves to the validity status (of the single current field if false, of the whole form else)
     */
    inputHandler( event, opts={} ){
        // an event addressed to another formChecker, or already handled by another FormChecker
        if(( event.originalEvent['FormChecker'] || {} ).handled === true ){
            return Promise.resolve( null );
        // not already handled, so try to handle it here
        } else {
            if( this.#priv.errclear ){
                this.#priv.errclear();
            }
            const o = this._domDataByEvent( event, opts );
            if( !o || !this[ o.fn ] ){
                return Promise.resolve( null );
            }
            event.originalEvent['FormChecker'] = { handled: true };
            return this[ o.fn ]( o, opts )
                .then(( valid ) => {
                    if( valid && opts.autorun_check !== false ){
                        return this.check({ field: o.field, update: false });
                    }
                    return valid;
                });
        }
    }

    /**
     * @summary set options to be passed to the form checkers
     * @param {Object} data
     */
    setData( data ){
        //console.debug( 'setData()', data );
        this.#priv.data = data || {};
    }

    /**
     * @summary set a form field
     * @param {String} field
     *  When have children fields, the 'field' should be specified as parent+'_'+field
     * @param {Object} item
     */
    setField( field, item ){
        const eltData = this._domDataByField( field );
        if( eltData ){
            this._valueTo( eltData, item );
        } else {
            Meteor.isDevelopment && console.warn( field, 'unknown or uninitialized field' );
        }
    }

    /**
     * @summary initialize the form with the given data
     * @param {Object} item
     * @param {Object} opts an option object with following keys:
     *  $parent: when set, the DOM parent of the targeted form - in case of an array
     */
    setForm( item, opts={} ){
        const self = this;
        const cb = function( args, field, defn, parent ){
            if( defn.js ){
                let $js = null;
                if( opts.$parent ){
                    $js = opts.$parent.find( defn.js );
                } else {
                    $js = self.#priv.instance.$( defn.js );
                }
                if( $js && $js.length === 1 ){
                    eltData = $js.data( 'form-checker' );
                    if( !eltData ){
                        this._domDataSet( $js, field, defn, parent );
                        eltData = $js.data( 'form-checker' );
                    }
                    if( eltData ){
                        self._valueTo( eltData, item );
                    } else {
                        Meteor.isDevelopment && console.warn( field, 'eltData not set' );
                    }
                }
            }
            return true;
        };
        this._fieldsIterate( cb );
    }

    /**
     * @summary initialize the elements DOM data in case of a dynamic form
     * @param {Object} opts an option object with following keys:
     *  $parent: when set, the DOM parent of the targeted form - in case of an array
     */
    setupDom( opts={} ){
        const self = this;
        const cb = function( args, field, defn, parent ){
            if( defn.js ){
                let $js = null;
                if( opts.$parent ){
                    $js = opts.$parent.find( defn.js );
                } else {
                    $js = self.#priv.instance.$( defn.js );
                }
                if( $js && $js.length === 1 ){
                    eltData = $js.data( 'form-checker' );
                    if( !eltData ){
                        this._domDataSet( $js, field, defn, parent );
                    }
                    opts.update = false;
                    this.check( opts );
                }
            }
            return true;
        };
        this._fieldsIterate( cb );
    }
}
