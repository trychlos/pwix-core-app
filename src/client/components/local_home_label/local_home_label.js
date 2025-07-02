/*
 * pwix:core-app/src/client/components/local_home_label/local_home_label.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './local_home_label.html';

Template.local_home_label.helpers({
    // the label of the application
    label(){
        return Meteor.APP.runContext.label();
    },

    // the name of the application
    name(){
        return Meteor.APP.runContext.name();
    }
});
