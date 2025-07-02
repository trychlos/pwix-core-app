/*
 * pwix:core-app/src/client/components/coreLegalsLink/coreLegalsLink.js
 *
 * Parms:
 * - label: the label displayed as the link, defaults to (localized) 'Legal informations'
 * - title: the title of the link, defaults to (localized) 'Legal informations'
 * - page: the identifier of the target display unit, defaults to 'lm_legals'
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import './coreLegalsLink.html';

Template.coreLegalsLink.helpers({
    // the label
    label(){
        return this.label || pwixI18n.label( I18N, 'legalslink.label' );
    },

    // the route
    route(){
        const page = this.page || 'lm_legals';
        const unit = page ? Meteor.APP.displaySet.byName( page ) : null;
        const route = unit ? unit.get( 'route' ) : '';
        return route;
    },

    // the title
    title(){
        return this.title || pwixI18n.label( I18N, 'legalslink.title' );
    }
});
