/*
 * pwix:core-app/src/client/components/coreCookiesLink/coreCookiesLink.js
 *
 * Parms:
 * - label: the label displayed as the link, defaults to (localized) 'Cookies management policy'
 * - title: the title of the link, defaults to (localized) 'Cookies management policy'
 * - page: the identifier of the target display unit, defaults to 'lm_cookies'
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import './coreCookiesLink.html';

Template.coreCookiesLink.helpers({

    // the label
    label(){
        return this.label || pwixI18n.label( I18N, 'cookieslink.label' );
    },

    // the route
    route(){
        const page = this.page || 'lm_cookies';
        const unit = page ? Meteor.APP.displaySet.byName( page ) : null;
        const route = unit ? unit.get( 'route' ) : '';
        return route;
    },

    // the title
    title(){
        return this.title || pwixI18n.label( I18N, 'cookieslink.title' );
    }
});
