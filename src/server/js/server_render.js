/*
 * pwix:core-app/src/server/js/server_render.js
 */

import _ from 'lodash';

import { EnvSettings } from "meteor/pwix:env-settings";
import { Logger } from 'meteor/pwix:logger';
import { onPageLoad } from "meteor/server-render";

const logger = Logger.get();

onPageLoad(( sink ) => {
    if( EnvSettings.ready()){
        EnvSettings.environmentSettings().then(( res ) => {
            if( res?.settings?.head ){
                Object.keys( res.settings.head ).every(( key ) => {
                    let html;
                    switch( key ){
                        case 'meta':
                            if( _.isArray( res.settings.head.meta )){
                                res.settings.head.meta.every(( it ) => {
                                    html = '<meta ';
                                    Object.keys( it ).every(( attribute ) => {
                                        html += attribute;
                                        html += '=';
                                        html += '"'+it[attribute]+'" ';
                                        return true;
                                    });
                                    html += '/>\n';
                                    sink.appendToHead( html );
                                    return true;
                                });
                            } else {
                                logger.warn( 'expect head.meta be an array of objects, got', res.settings.head.meta );
                            }
                            break;
                        case 'title':
                            html = '<title>'+res.settings.head[key]+'</title>\n';
                            sink.appendToHead( html );
                            break;
                        default:
                            logger.warn( 'unmanaged head key \''+key+'\'' );
                            break;
                    }
                    return true;
                });
            }
        });
    }
});
