/*
 * pwix:core-app/src/client/components/coreAppMain/coreAppMain.js
 *
 * The (main) topmost component of the application UI:
 *  - get the window title from the settings
 *  - get back the data context as initialized by the router.
 *
 * General layout:
 * --------------
 *  +- coreAppMain                      get default window title from settings for this environment
 *      |                               get data context passed in from this route through BlazeLayout
 *      |
 *      +- coreAppLayout                compute whether to display the header and the footer
 *          |                           manage the global theme
 *          |                           manage application-level menus
 *          |
 *          +- coreAppHeader
 *          |
 *          +- coreAppContent           compute and render the to-be-displayed template
 *          |
 *          +- app_footer
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import './coreAppMain.html';
import './coreAppMain.less';

Template.coreAppMain.onCreated( function(){
    console.log( 'Template.coreAppMain.onCreated()', this );
});

Template.coreAppMain.onRendered( function(){
    console.log( 'Template.coreAppMain.onRendered()' );
    const self = this;

    // set window title
    self.autorun(() => {
        document.title = Meteor.APP.runContext.title();
    });
});

Template.coreAppMain.helpers({
    // get back data passed from the router through BlazeLayout as a 'dataContext' object
    setDataContext( o ){
        console.log( 'Template.coreAppMain.helpers.setDataContext()', o );
        Meteor.APP.runContext.dataContext( o );
    }
});

Template.coreAppMain.onDestroyed( function(){
    console.log( 'Template.coreAppMain.onDestroyed()' );
});
