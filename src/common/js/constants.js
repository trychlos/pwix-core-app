/*
 * pwix:core-app/src/common/js/constants.js
 */

CoreApp.C = {
    // known components
    Component: {
        APP_ENV:       'APP_ENV',
        APP_LOGO:      'APP_LOGO',
        APP_LABEL:     'APP_LABEL',
        APP_NAME:      'APP_NAME',
        APP_TITLE:     'APP_TITLE',
        EDIT_SWITCH:   'EDIT_SWITCH',
        LANG_SELECT:   'LANG_SELECT',
        MENU_BUTTON:   'MENU_BUTTON',
        TENANT_SELECT: 'TENANT_SELECT',
        USER_BUTTON:   'USER_BUTTON'
    },
    // verbosity levels
    Verbose: {
        NONE: 0,
        CONFIGURE:      0x01 <<  0,
        FUNCTIONS:      0x01 <<  1,
        PAGE:           0x01 <<  2, // a synonym for DISPLAY_UNIT
        DISPLAY_UNIT:   0x01 <<  2
    }
};

// the standard order of the components of the right part of the header
CoreApp.C.RightHeader = [
    CoreApp.C.Component.EDIT_SWITCH,
    CoreApp.C.Component.LANG_SELECT,
    CoreApp.C.Component.USER_BUTTON,
    CoreApp.C.Component.MENU_BUTTON
];


// non exported variables

I18N = 'pwix:core-app:i18n:namespace';
