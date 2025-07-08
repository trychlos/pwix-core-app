/*
 * pwix:core-app/src/common/i18n/fr.js
 */

CoreApp.i18n = {
    ... CoreApp.i18n,
    ... {
        fr: {
            accounts: {
                login: {
                    preamble: 'La page demandée requiert des permissions uniquement attribuées à des utilisateurs authentifiés.<br />'
                        +'Merci de vous connecter avant de continuer.<br />'
                },
            },
            cookieslink: {
                label: 'Politique de gestion des cookies',
                title: 'Politique de gestion des cookies'
            },
            field_check: {
                none_title: '',
                invalid_title: 'Cette valeur n\'est pas valide, et bloque la sauvegarde du document',
                uncomplete_title: 'Cette valeur n\'est pas renseignée ou n\'est pas valide, bien qu\'elle le devrait. '
                    +'Cela ne devrait pas empêcher de sauvegarder le document , mais le résultat peut ne pas être complètement opérationnel',
                valid_title: 'La valeur est valide'
            },
            field_type: {
                info_title: 'Cette valeur n\'est affichée que pour information, ne peut pas être modifiée ici',
                optional_title: 'Cette valeur est optionelle',
                save_title: 'Cette valeur est obligatoire; elle doit être renseignée et valide pour que le document puisse être sauvegardé',
                work_title: 'Cette valeur est obligatoire, mais n\'empêchera pas le document d\'être sauvegardé. '
                    +'En tout état de cause, vous devrez probablement revenir ici et positionner une valeur valide pour que le résultat soit pleinement opérationnel'
            },
            gdprlink: {
                label: 'Politique de gestion des données personnelles',
                title: 'Politique de gestion des données personnelles'
            },
            gtulink: {
                label: 'Conditions Générales d\'Utilisation',
                title: 'Conditions Générales d\'Utilisation'
            },
            header: {
                menu: {
                    managers: 'Managers'
                },
                my_roles: 'Mes rôles'
            },
            legalslink: {
                label: 'Mentions légales',
                title: 'Mentions légales'
            },
            manager: {
                accounts: {
                    preamble: 'Définissez et organisez ici les comptes des utilisateurs autorisés à se connecter à l\'application.',
                    tab_title: 'Gestion des comptes'
                },
                contents: {
                    preamble: 'Vous avez accès ici au catalogue des contenus éditables en ligne.',
                    tab_title: 'Gestion des contenus'
                },
                tenants: {
                    preamble: 'Définissez et organisez ici les tenants gérés par l\'application.<br />'
                        +'Les tenants peuvent utiliser plusieurs périodes de validité si nécessaire.<br />'
                        +'N\'oubliez pas d\'identifier au moins un gérant pour chaque tenant de telle sorte qu\'il puisse être autonome.<br />',
                    tab_title: 'Gestion des tenants'
                }
            },
            powered_by: {
                label: 'Propulsé par <img src="/packages/pwix_core-app/resources/meteor.ico" alt="Meteor" title="Meteor" height="16px" width="16px" /> Meteor&trade;'
            },
            yesno: {
                no_short: 'Non',
                select_text: '',
                yes_short: 'Oui'
            },
        }
    }
};
