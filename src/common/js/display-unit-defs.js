/*
 * pwix:core-app/src/common/js/display-unit-defs.js
 * 
 * DisplayUnit's are defined in common code to be scanned for reserved words.
 * They are nonetheless instanciated in client side only.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AppPages } from 'meteor/pwix:app-pages';

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
            route: (( CoreApp.configure().routePrefix || '' )+'/lm.cookies' ).replace( /\/+/g, '/' ),
            wantEditionSwitch: true
        },
        lm_gdpr: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'gdpr-231001'
            },
            route: (( CoreApp.configure().routePrefix || '' )+'/lm.gdpr' ).replace( /\/+/g, '/' ),
            wantEditionSwitch: true
        },
        lm_gtu: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'gtu-231001'
            },
            route: (( CoreApp.configure().routePrefix || '' )+'/lm.gtu' ).replace( /\/+/g, '/' ),
            wantEditionSwitch: true
        },
        lm_legals: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'legals-231001'
            },
            route: (( CoreApp.configure().routePrefix || '' )+'/lm.legals' ).replace( /\/+/g, '/' ),
            wantEditionSwitch: true
        },
        managers: {
            template: 'coreManagersPage',
            route: '/managers',
            route: (( CoreApp.configure().routePrefix || '' )+'/managers' ).replace( /\/+/g, '/' ),
            inMenus: [ CoreApp.configure().mainMenu ],
            menuLabel: 'header.menu.managers',
            wantEditionSwitch: true,
            wantPermission: 'pwix.core_app.menus.managers'
        }
    }
};
