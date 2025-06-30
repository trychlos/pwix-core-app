/*
 * pwix:core-app/src/client/components/coreGDPRLink/coreGDPRLink.js
 *
 * Parms:
 * - label: the label displayed as the link, defaults to (localized) 'Personal data management policy'
 * - title: the title of the link, defaults to (localized) 'Personal data management policy'
 * - page: the identifier of the target display unit, defaults to 'lm_gdpr'
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import './coreGDPRLink.html';

Template.coreGDPRLink.helpers({
    // the label
    label(){
        return this.label || pwixI18n.label( I18N, 'gdprlink.label' );
    },

    // the route
    route(){
        const page = this.page || 'lm_gdpr';
        const unit = page ? Meteor.APP.displaySet.byName( page ) : null;
        const route = unit ? (( CoreApp.configure().routePrefix || '' )+'/'+unit.get( 'route' )).replace( /\/+/g, '/' ) : '';
        return route;
    },

    // the title
    title(){
        return this.title || pwixI18n.label( I18N, 'gdprlink.title' );
    }
});
