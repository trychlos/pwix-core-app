/*
 * pwix:core-app/src/client/components/coreAppLegals/coreAppLegals.js
 *
 * Data context:
 * - collection
 * - document
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AppPagesEdit } from 'meteor/pwix:app-pages-edit';

import './coreAppLegals.html';

Template.coreAppLegals.helpers({
    // the collection the document is attached to
    collection(){
        return this.collection || AppPagesEdit.configure().collection;
    },

    // the document
    document(){
        return this.document;
    }
});
