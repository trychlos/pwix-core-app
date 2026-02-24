Package.describe({
    name: 'pwix:core-app',
    version: '1.1.0-rc',
    summary: 'Meteor RunContext application core class',
    git: 'https://github.com/trychlos/pwix-core-app.git',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'CoreApp'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:core-app' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    const _use = function(){
        api.use( ...arguments );
        api.imply( ...arguments );
    };
    api.versionsFrom([ '2.9.0', '3.0-rc.0' ]);
    _use( 'check' );
    _use( 'blaze-html-templates@2.0.0 || 3.0.0-alpha300.0', 'client' );
    _use( 'ecmascript' );
    _use( 'less@4.0.0', 'client' );
    _use( 'mongo@1.16.1 || 2.0.0-rc300.2' );
    _use( 'ostrio:flow-router-extra@3.10.0' );
    _use( 'pwix:accounts-hub@1.0.0' );
    _use( 'pwix:accounts-manager@2.0.0' );
    _use( 'pwix:app-pages@1.0.0' );
    _use( 'pwix:app-pages-edit@1.0.0-rc' );
    _use( 'pwix:app-pages-i18n@1.0.0-rc' );
    _use( 'pwix:blaze-layout@2.0.0' );
    _use( 'pwix:editor@1.5.0' );
    _use( 'pwix:env-settings@2.0.0' );
    _use( 'pwix:env-settings-ext@1.0.0-rc' );
    _use( 'pwix:i18n@1.5.0' );
    _use( 'pwix:modal@2.2.0' );
    _use( 'pwix:permissions@1.0.0' );
    _use( 'pwix:roles@1.2.0' );
    _use( 'pwix:tenants-manager@1.0.0' );
    _use( 'pwix:ui-layout@2.0.0' );
    _use( 'pwix:ui-utils@1.4.0' );
    _use( 'reactive-dict' );
    _use( 'reactive-var' );
    _use( 'tmeasday:check-npm-versions@1.0.2 || 2.0.0-beta.0', 'server' );
    _use( 'tracker' );
    //_use( 'tracker', 'client' );
    api.addFiles([
        //'src/client/components/coreAppLegals/coreAppLegals.js',
        //'src/client/components/coreAppMenuButton/coreAppMenuButton.js',
        'src/client/components/coreCookiesLink/coreCookiesLink.js',
        'src/client/components/coreGDPRLink/coreGDPRLink.js',
        'src/client/components/coreGTULink/coreGTULink.js',
        'src/client/components/coreLegalsLink/coreLegalsLink.js',
        //'src/client/components/coreLogin/coreLogin.js',
        'src/client/components/corePoweredBy/corePoweredBy.js',
        //'src/client/components/coreSaa/coreSaa.js',
        //'src/client/components/coreSiteCopyright/coreSiteCopyright.js',
        //'src/client/components/coreSiteEnv/coreSiteEnv.js',
        //'src/client/components/coreSiteLogo/coreSiteLogo.js',
        //'src/client/components/coreSiteName/coreSiteName.js',
        //'src/client/components/coreYesnoSelect/coreYesnoSelect.js'
    ], 'client' );
    api.addAssets([
        'resources/ico/meteor.ico',
        'resources/svg/startup-app-admin.svg',
        'resources/svg/favicon.svg',
        'resources/svg/login-image.svg',
        'resources/png/pwi-consulting-footer-logo.png'
     ], 'client' );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies
