/*
 * pwix:core-app/src/client/components/coreSiteEnv/coreSiteEnv.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './coreSiteEnv.html';

Template.coreSiteEnv.helpers({
    env(){
        return Meteor.settings.public.runtime.env;
    }
});
