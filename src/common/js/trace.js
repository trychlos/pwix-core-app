/*
 * pwix:core-app/src/common/js/trace.js
 */

_verbose = function( level ){
    if( CoreApp.configure().verbosity & level ){
        let args = [ ...arguments ];
        args.shift();
        console.debug( 'pwix:core-app', ...args );
    }
};

_trace = function( functionName ){
    _verbose( CoreApp.C.Verbose.FUNCTIONS, ...arguments );
};
