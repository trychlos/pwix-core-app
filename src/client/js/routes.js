/*
 * pwix:core-app/src/client/js/routes.js
 *
 * Define some generic configuration for Flowrouter
 */

import _ from 'lodash';

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Logger } from 'meteor/pwix:logger';
import { Tracker } from 'meteor/tracker';

const logger = Logger.get();

// https://github.com/veliovgroup/flow-router/wiki
// DISABLE QUERY STRING COMPATIBILITY
// WITH OLDER FlowRouter AND Meteor RELEASES
FlowRouter.decodeQueryParamsOnce = true;

// A catch-all route which redirects to /
FlowRouter.route( '*', {
    action(){
        logger.log( 'catch-all route', FlowRouter.current());
        FlowRouter.go( '/' );
    },
});

// on user logout, go back to home
let isConnected = false;
Tracker.autorun(() => {
    if( Meteor.userId()){
        isConnected = true;
    }
});
Tracker.autorun(() => {
    if( isConnected && !Meteor.userId()){
        isConnected = false;
        FlowRouter.go( '/' );
    }
});
