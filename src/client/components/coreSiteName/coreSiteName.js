/*
 * pwix:core-app/src/client/components/coreSiteName/coreSiteName.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './coreSiteName.html';

Template.coreSiteName.helpers({
    name(){
        return CoreApp.configure().appName;
    }
});
