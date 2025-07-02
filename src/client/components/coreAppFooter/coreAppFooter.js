/*
 * pwix:core-app/src/client/components/coreAppFooter/coreAppFooter.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './coreAppFooter.html';

Template.coreAppFooter.helpers({
    parmsCookies(){
        return {
            page: 'lm_cookies'
        };
    },
    parmsGDPR(){
        return {
            page: 'lm_gdpr'
        };
    },
    parmsGTU(){
        return {
            page: 'lm_gtu'
        };
    },
    parmsLegals(){
        return {
            page: 'lm_legals'
        };
    }
});
