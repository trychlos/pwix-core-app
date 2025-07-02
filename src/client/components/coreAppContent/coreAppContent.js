/*
 * pwix:core-app/client/components/coreAppContent/coreAppContent.js
 *
 * Compute and render the to-be-displayed template.
 * 
 * Parms:
 * - template: the template to be displayed
 * - data: the data to be associated to this template
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './coreAppContent.html';

Template.coreAppContent.helpers({

    // the computed data context, defaulting to this current data context
    data(){
        return this.data;
    },

    // the computed template
    template(){
        return this.template;
    }
});
