/*
 * pwix:core-app/src/client/components/corePoweredBy/corePoweredBy.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { pwixI18n } from 'meteor/pwix:i18n';

import './corePoweredBy.html';

Template.corePoweredBy.helpers({
    // string localization
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    }
});
