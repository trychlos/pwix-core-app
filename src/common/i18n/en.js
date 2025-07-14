/*
 * pwix:core-app/src/common/i18n/en.js
 */

CoreApp.i18n = {
    ... CoreApp.i18n,
    ... {
        en: {
            accounts: {
                login: {
                    preamble: 'The page you are requesting requires permissions which are only given to identified user accounts.<br />'
                        +'Please connect and enjoy.<br />'
                },
            },
            cookieslink: {
                label: 'Cookies management policy',
                title: 'Cookies management policy'
            },
            field_check: {
                none_title: '',
                invalid_title: 'This value is not valid preventing the document to be saved',
                uncomplete_title: 'This value is not set or not valid, but should. '
                    +'This should not prevent the document to be saved, but the result may not be fully operational',
                valid_title: 'The value is valid'
            },
            field_type: {
                info_title: 'This value is displayed for information only, cannot be modified here',
                optional_title: 'This value is optional',
                save_title: 'This value is mandatory; it must be set and valid in order the document be saved',
                work_title: 'This value is mandatory, but will not prevent the document to be saved. '
                    +'Anyway you may have to come back here to set it in order the result be fully operational'
            },
            gdprlink: {
                label: 'Personal data management policy',
                title: 'Personal data management policy'
            },
            gtulink: {
                label: 'General Terms of Use',
                title: 'General Terms of Use'
            },
            header: {
                menu: {
                    managers: 'Managers'
                },
                my_roles: 'My roles'
            },
            home: {
                wait: 'Please wait for readyness...'
            },
            legalslink: {
                label: 'Legals Informations',
                title: 'Legals Informations'
            },
            manager: {
                accounts: {
                    preamble: 'Register and manage here the accounts allowed to connect to the application.',
                    tab_title: 'Accounts Management'
                },
                contents: {
                    preamble: 'You get here a catalog of the registered inline-editable documents.',
                    tab_title: 'Contents Management'
                },
                tenants: {
                    preamble: 'Register and manage here the involved tenants.<br />'
                        +'Tenants can take advantage of validity periods.<br />'
                        +'Do not omit to define at least one manager per tenant so that he/she can later be autonomous.<br />',
                    tab_title: 'Tenants Management'
                }
            },
            powered_by: {
                label: 'Powered by <img src="/packages/pwix_core-app/resources/meteor.ico" alt="Meteor" title="Meteor" height="16px" width="16px" /> Meteor&trade;'
            },
            yesno: {
                no_short: 'No',
                select_text: '',
                yes_short: 'Yes'
            }
        }
    }
};
