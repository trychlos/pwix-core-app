/*
 * pwix:core-app/src/common/js/display-unit-defs.js
 * 
 * DisplayUnit's are defined in common code to be scanned for reserved words.
 * They are nonetheless instanciated in client side only.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AppPages } from 'meteor/pwix:app-pages';

function _compute_prefixed_route( route ){
    return (( CoreApp.configure().routePrefix || '' )+'/'+route ).replace( /\/+/g, '/' )
}

AppPages.displayUnitDefs = {
    ... AppPages.displayUnitDefs,
    ... {
        home: {
            route: '/',
            template: 'coreAppHome',
            wantEditionSwitch: true
        },
        lm_cookies: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'cookies-policy-231001'
            },
            route: _compute_prefixed_route( '/lm.cookies' ),
            wantEditionSwitch: true
        },
        lm_gdpr: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'gdpr-231001'
            },
            route: _compute_prefixed_route( '/lm.gdpr' ),
            wantEditionSwitch: true
        },
        lm_gtu: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'gtu-231001'
            },
            route: _compute_prefixed_route( '/lm.gtu' ),
            wantEditionSwitch: true
        },
        lm_legals: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'legals-231001'
            },
            route: _compute_prefixed_route( '/lm.legals' ),
            wantEditionSwitch: true
        },
        managers: {
            template: 'coreManagersPage',
            route: '/managers',
            route: _compute_prefixed_route( '/managers' ),
            inMenus: [ CoreApp.configure().mainMenu ],
            menuLabel: 'header.menu.managers',
            wantEditionSwitch: true,
            wantPermission: 'pwix.core_app.menus.managers'
        }
    }
};
