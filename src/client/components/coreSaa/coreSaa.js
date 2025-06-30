/*
 * pwix:core-app/src/client/components/coreSaa/coreSaa.js
 *
 * Manage startup-app-admin workflow if package is present
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './coreSaa.html';

Template.coreSaa.helpers({
    // when we do not have yet an application administrator, let the user create the first one
    //  for now, at least pass the current args (which is implied nonetheless but that is explicit)
    args(){
        return {
            ...this,
            image: '/packages/pwix_core-app/resources/startup-app-admin.svg'
        };
    }
});
