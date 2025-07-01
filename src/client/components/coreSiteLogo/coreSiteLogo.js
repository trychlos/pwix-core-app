/*
 * pwix:core-app/src/client/components/coreSiteLogo/coreSiteLogo.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './coreSiteLogo.html';

Template.coreSiteLogo.helpers({
    logo(){
        return Meteor.APP.runContext.logo();
    }
});
