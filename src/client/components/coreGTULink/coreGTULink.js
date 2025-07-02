/*
 * pwix:core-app/src/client/components/coreGTULink/coreGTULink.js
 *
 * Parms:
 * - label: the label displayed as the link, defaults to (localized) 'General Terms of Use'
 * - title: the title of the link, defaults to (localized) 'General Terms of Use'
 * - page: the identifier of the target display unit, defaults to 'lm_gtu'
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import './coreGTULink.html';

Template.coreGTULink.helpers({

    // the label
    label(){
        return this.label || pwixI18n.label( I18N, 'gtulink.label' );
    },

    // the route
    route(){
        const page = this.page || 'lm_gtu';
        const unit = page ? Meteor.APP.displaySet.byName( page ) : null;
        const route = unit ? unit.get( 'route' ) : '';
        return route;
    },

    // the title
    title(){
        return this.title || pwixI18n.label( I18N, 'gtulink.title' );
    }
});
