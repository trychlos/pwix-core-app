/*
 * pwix:core-app/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};
CoreApp._conf = new ReactiveVar( _conf );

CoreApp._defaults = {
    appName: null,
    colorTheme: 't-default-color',
    homeTemplate: 'coreAppHome',
    layoutTheme: 't-default-layout',
    leftHeader: [ CoreApp.C.Component.APP_LOGO, CoreApp.C.Component.APP_NAME, CoreApp.C.Component.APP_ENV, CoreApp.C.Component.TENANT_SELECT ],
    rightHeader: [ CoreApp.C.Component.EDIT_SWITCH, CoreApp.C.Component.LANG_SELECT, CoreApp.C.Component.USER_BUTTON, CoreApp.C.Component.MENU_BUTTON ],
    mainMenu: 'coreAppMenu',
    routePrefix: '/coreApp',
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
