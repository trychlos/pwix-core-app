/*
 * pwix:core-app/src/common/js/display-units.js
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
            template: CoreApp.configure().homeTemplate,
            wantEditionSwitch: true
        },
        lm_cookies: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'cookies-policy-231001'
            },
            route: '/lm.cookies',
            wantEditionSwitch: true
        },
        lm_gdpr: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'gdpr-231001'
            },
            route: '/lm.gdpr',
            wantEditionSwitch: true
        },
        lm_gtu: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'gtu-231001'
            },
            route: '/lm.gtu',
            wantEditionSwitch: true
        },
        lm_legals: {
            template: 'coreAppLegals',
            templateParms: {
                collection: 'legals',
                document: 'legals-231001'
            },
            route: '/lm.legals',
            wantEditionSwitch: true
        }
    }
};
