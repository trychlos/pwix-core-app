/*
 * pwix:core-app/src/client/components/corePoweredBy/corePoweredBy.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';

import './corePoweredBy.html';

Template.corePoweredBy.onCreated( function(){
    const self = this;

    // have to adapt the image width+height to the current font size
    self.PCK = {
        fontSize: new ReactiveVar( '16px' )
    };
});

Template.corePoweredBy.onRendered( function(){
    const self = this;

    self.autorun(() => {
        const fs = $( '.core-powered-by p' ).css( 'font-size' );
        self.PCK.fontSize.set( fs );
    });
});

Template.corePoweredBy.helpers({
    // string localization
    i18n( arg ){
        let label = pwixI18n.label( I18N, arg.hash.key );
        label = label.replaceAll( /16px/g, Template.instance().PCK.fontSize.get());
        return label;
    }
});
