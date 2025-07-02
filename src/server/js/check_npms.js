/*
 * pwix:core-app/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
    'lodash': '^4.17.0',
},
    'pwix:core-app'
);
