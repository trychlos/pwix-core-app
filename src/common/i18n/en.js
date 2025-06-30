/*
 * pwix:core-app/src/common/i18n/en.js
 */

CoreApp.i18n = {
    ... CoreApp.i18n,
    ... {
        en: {
            app: {
                default: {
                    title: 'Default Application Title (you may consider setting an actual title in your environment settings).'
                }
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
            legalslink: {
                label: 'Legals Informations',
                title: 'Legals Informations'
            },
            powered_by: {
                label: 'Powered by Meteor&trade;'
            },
            yesno: {
                no_short: 'No',
                select_text: '',
                yes_short: 'Yes'
            }
        }
    }
};
