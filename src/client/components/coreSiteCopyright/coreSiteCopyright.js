/*
 * pwix:core-app/src/client/components/coreSiteCopyright/coreSiteCopyright.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import '../site_copyright/site_copyright.js';

import './coreSiteCopyright.html';

Template.coreSiteCopyright.onCreated( function(){
    const self = this;

    self.PCK = {
        // the { template, data } object returned by configured siteCopyright() function
        template: new ReactiveVar( null )
    };

    self.autorun(() => {
        if( _.isFunction( CoreApp.configure().siteCopyright )){
            CoreApp.configure().siteCopyright()
                .then(( res ) => {
                    if( res && _.isObject( res ) && res.template ){
                        self.PCK.template.set( res );
                    } else {
                        console.warn( 'expects a { template, data } object, got', res );
                    }
                });
        } else {
            console.warn( 'expects \'siteCopyright\' be a function, got', CoreApp.configure().siteCopyright );
        }
    });
});

Template.coreSiteCopyright.helpers({
    // returns some data context for the template
    data(){
        return Template.instance().PCK.template.get()?.data;
    },

    // returns the template
    template(){
        const template = Template.instance().PCK.template.get()?.template;
        return template || null;
    }
});
