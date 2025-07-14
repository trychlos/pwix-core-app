/*
 * pwix:core-app/src/client/components/local_home_wait/local_home_wait.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { pwixI18n } from 'meteor/pwix:i18n';

import './local_home_wait.html';

Template.local_home_wait.helpers({
    // text translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    }
});
