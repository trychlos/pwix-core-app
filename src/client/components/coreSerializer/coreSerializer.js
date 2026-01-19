/*
 * pwix:core-app/src/client/components/coreSerializer/coreSerializer.js
 *
 * Manage The components edition mode.
 * 
 * We react here only to teSwitch toggle button switch, without considering who is actually logged in.
 * This is fine because the user permission is considered when displaying the teSwitch itself
 * (so when the teSwitch is toggled, then it has already been considered as allowed).
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Editor } from 'meteor/pwix:editor';
import { ReactiveVar } from 'meteor/reactive-var';
import { UILayout } from 'meteor/pwix:ui-layout';

import './coreSerializer.html';

Template.coreSerializer.onCreated( function(){
    // make sure we have the host variable
    CoreApp.Editor = CoreApp.Editor ?? {
        asked: new ReactiveVar( false )
    };
});

Template.coreSerializer.helpers({
    serializerParms(){
        const o = Template.currentData();
        // editable defaults to false
        //  so make that always non-editable UNLESS we really have settings.editable === true and enough width
        o.mode = Editor.C.Mode.STANDARD;
        if( CoreApp.Editor.asked.get() && UILayout.width() >= UILayout.C.Breakpoints.MD ){
            o.mode = Editor.C.Mode.PREVIEW;
        }
        //console.debug( 'serializerParms', o );
        return o;
    }
});
