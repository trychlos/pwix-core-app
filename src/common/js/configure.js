/*
 * pwix:core-app/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};
CoreApp._conf = new ReactiveVar( _conf );

async function local_copyright(){
    return {
        template: 'local_copyright',
        data: null
    };
}

async function local_home_inline(){
    return {
        template: 'local_home_inline',
        data: null
    };
}

async function local_home_label(){
    return {
        template: 'local_home_label',
        data: null
    };
}

CoreApp._defaults = {
    appName: null,
    appCopyrightTemplate: local_copyright,
    appHomeTemplate: local_home_label,
    colorTheme: 't-default-color',
    layoutTheme: 't-default-layout',
    mainMenu: 'coreAppMenu',
    routePrefix: '/core-app',
    verbosity: CoreApp.C.Verbose.CONFIGURE
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both by the client and the server.
 * @param {Object} o configuration options
 * @returns {Object} the package configuration
 */
CoreApp.configure = function( o ){
    if( o && _.isObject( o )){
        _conf = _.merge( CoreApp._defaults, _conf, o );
        CoreApp._conf.set( _conf );
        // be verbose if asked for
        _verbose( CoreApp.C.Verbose.CONFIGURE, 'configure() with', o );
    }
    // also acts as a getter
    return CoreApp._conf.get();
}

_conf = _.merge( {}, CoreApp._defaults );
CoreApp._conf.set( _conf );
