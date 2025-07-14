/*
 * pwix:core-app/src/client/components/coreAppHome/coreAppHome.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { ReactiveVar } from 'meteor/reactive-var';

import '../local_home_inline/local_home_inline.js';
import '../local_home_label/local_home_label.js';
import '../local_home_wait/local_home_wait.js';

import './coreAppHome.html';

Template.coreAppHome.onCreated( function(){
    const self = this;

    self.PCK = {
        // the { template, data } object returned by configured appHomeTemplate() function
        template: new ReactiveVar( null )
    };

    self.autorun(() => {
        if( _.isFunction( CoreApp.configure().appHomeTemplate )){
            CoreApp.configure().appHomeTemplate()
                .then(( res ) => {
                    if( res && _.isObject( res ) && res.template ){
                        self.PCK.template.set( res );
                    } else {
                        console.warn( 'expects a { template, data } object, got', res );
                    }
                });
        } else {
            console.warn( 'expects \'appHomeTemplate\' be a function, got', CoreApp.configure().appHomeTemplate );
        }
    });
});

Template.coreAppHome.helpers({
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
