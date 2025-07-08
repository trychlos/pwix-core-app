/*
 * pwix:core-app/src/client/components/coreLogin/coreLogin.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { AccountsUI } from 'meteor/pwix:accounts-ui';
import { pwixI18n } from 'meteor/pwix:i18n';
import { UIUtils } from 'meteor/pwix:ui-utils';

import './coreLogin.html';

Template.coreLogin.onRendered( function(){
    const self = this;

    // when the user must log in, the acUserLogin doesn't take the focus
    //  this works (i.e. resolves with the INPUT element, but doesn't gain the focus either)
    UIUtils.DOM.waitFor( '.core-app-content .acUserLogin input' )
        .then(( res ) => { self.$( res ).focus(); });
});

Template.coreLogin.helpers({
    // a side image
    image(){
        return CoreApp.configure().loginImage;
    },

    // user connection
    parmsUserLogin(){
        return {
            initialDisplay: AccountsUI.C.Panel.SIGNIN,
            renderMode: AccountsUI.C.Render.DIV,
            haveCancelButton: false,
            signinLink: false,
            signupLink: false,
            signinTextOne: pwixI18n.label( I18N, 'accounts.login.preamble' ),
            resetLink: false,
            name: 'core-app:core-login:user-login'
        };
    }
});
