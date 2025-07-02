/*
 * pwix:core-app/src/client/components/coreAppHome/coreAppHome.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './coreAppHome.html';

Template.coreAppHome.helpers({
    // the label of the application
    label(){
        return Meteor.APP.runContext.label();
    },

    // the name of the application
    name(){
        return Meteor.APP.runContext.name();
    }
});
