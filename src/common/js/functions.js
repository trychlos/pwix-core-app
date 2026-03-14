/*
 * pwix:core-app/src/common/js/functions.js
 */

import _ from 'lodash';

/**
 * Reactive one-shot latch.
 * 
 * @summary This function makes sure the (async) action is run only once when reactive prepare() has been true.
 * 
 * @param {Blaze.TemplateInstance} owner
 * @param {Function} prepare
 *  prepare() is reactive.
 *  prototype is prepare():<Any>, where <any> can be any truethy value to be passed as payload to action()
 * 
 * @param {Function} action
 *  prototype is async action( computation, payload<Any> )
 * 
 * @usage
 *      CoreApp.autorunOnce( self, () => {
 *          const dataContext = Template.currentData();
 *          if( dataContext.index < dataContext.entity.get().DYN.records.length ){
 *              const parentChecker = dataContext.checker?.get();
 *              let checker = self.APP.checker.get();
 *              if( parentChecker && !checker ){
 *                  return {
 *                      dataContext,
 *                      parentChecker,
 *                      index: dataContext.index,
 *                      entity: dataContext.entity,
 *                      enabled: dataContext.enableChecks !== false
 *                  }
 *              }
 *          }
 *      }, async ( comp, payload ) => {
 *          checker = new Forms.Checker( self );
 *          logger.warning( 'initializing client_properties_panel' );
 *          await checker.init({
 *              name: 'client_properties_panel',
 *              parentChecker: payload.parentChecker,
 *              data: {
 *                  entity: payload.entity,
 *                  index: payload.index
 *              },
 *              enabled: payload.enabled
 *          });
 *          self.APP.checker.set( checker );
 *      });
 */
CoreApp.autorunOnce = function( owner, prepare, action, opts={} ){
    let running = false;
    let done = false;

    return owner.autorun(( comp ) => {
        if( done || running ){
            return;
        }

        let payload = null;

        try {
            payload = prepare();
        } catch( err ){
            if( opts.onError ){
                opts.onError( err );
                return;
            }
            throw err;
        }

        if( !payload ){
            return;
        }

        running = true;

        Tracker.nonreactive( async () => {
            try {
                await action( comp, payload );
                done = true;
                comp.stop();
            } catch( err ){
                if( opts.onError ){
                    opts.onError( err );
                } else {
                    throw err;
                }
            } finally {
                running = false;
            }
        });
    });
}
