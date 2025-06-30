# pwix:core-app

## What is it ?

The `pwix:core-app` package provides a common framework to applications by gathering needed elementary other packages:

- define some common semantics, along with the corresponding `AppPages.RunContext` helpers:

    - to be configure()'d:

        - name: the application short name

    - to be setup in environment settings:

        - contact: a contact email address, defaulting to 'no-reply@localhost'
        - logo: the path to the logo image, defaulting to '/favicon.svg'
        - sender: the sender address of all emails sent by the application, defaulting to 'no-reply@localhost'
        - title: the title of the application

- extends `AppPages.RunContext` with internationalization and application administrator helpers

Goal is to be able to initialize a running (though rather empty) application rather quickly, maximizing time to code actual application features.

## Provides

### `CoreApp`

The exported `CoreApp` global object provides following items:

#### Functions

##### `CoreApp.configure()`

See [below](#configuration).

A reactive data source.

##### `CoreApp.i18n.namespace()`

Returns the i18n namespace used by the package. Used to add translations at runtime.

### `AppPages.RunContext` extension

The `AppPages.RunContext` class is extended with:

- `xxxxx(): Boolean` method

    Whether the environment settings of the application has a `xxxxxxxx` set to true, defaulting to false.

### Blaze components

#### `coreCookiesLink`

Display a link to the Cookies Policy.

Parameters can be provided:

- `label`, the displayed link label, defaulting to (localized) 'Cookies management policy'
- `title`, the link title, defaulting to (localized) 'Cookies management policy'
- `page`, the identifier of the target display unit, defaulting to `lm_cookies`

    The default display unit is defined as an inline-edited localized document from `legals` collection.

#### `coreFieldCheckIndicator`

Display an indicator about the validity status of a field.

Parameters:

- type: a `CoreApp.FieldCheck` constant as `INVALID`, `NONE`, `UNCOMPLETE` or `VALID`.

#### `coreFieldTypeIndicator`

Display an indicator about the type of a field.

Parameters:

- type: a `CoreApp.FieldType` constant as `INFO`, `SAVE` or `WORK`
- classes: if set, a list of classes to be added to the default ones.

#### `coreGDPRLink`

Display a link to the Privacy Policy.

Parameters can be provided:

- `label`, the displayed link label, defaulting to 'Privacy Policy'
- `title`, the link title, defaulting to 'Privacy Policy'
- `page`, the identifier of the target display unit, defaulting to `lm_gdpr`

    The default display unit is defined as an inline-edited localized document from `legals` collection.

#### `coreGTULink`

Display a link to the General Terms of Use.

Parameters can be provided:

- `label`, the displayed link label, defaulting to 'General Terms of Use'
- `title`, the link title, defaulting to 'General Terms of Use'
- `page`, the identifier of the target display unit, defaulting to `lm_gtu`

    The default display unit is defined as an inline-edited localized document from `legals` collection.

#### `coreLegalsLink`

Display a link to the Legal Informations.

Parameters can be provided:

- `label`, the displayed link label, defaulting to 'Legal Informations'
- `title`, the link title, defaulting to 'Legal Informations'
- `page`, the identifier of the target display unit, defaulting to `lm_legals`

    The default display unit is defined as an inline-edited localized document from `legals` collection.

### Less mixins

#### `.x-btn-variant( @color )`

#### `.x-btn-outline-variant( @color )`

## Configuration

The package's behavior can be configured through a call to the `CoreApp.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `appName`

    Defines the name of the application role. By convention, this name is also a key in settings, and contain an `environments` object addressed by the `APP_ENV` environment variable on the server.

- `homeTemplate`

    Defines the name of the template to be used to display the (public) home page.

    Defaults to `coreAppHome`, which displays the label of the application in the middle of the page.

- `mainMenu`

    Defines the name of the main menu displayed in the header of the pages.

    Defaults to `coreAppMenu`.

- `rightHeaderOrder`

    Defines the ordered list of the elements in the right part of the header.

    Defaults to `[ CoreApp.C.Component.EDIT_SWITCH, CoreApp.C.Component.LANG_SELECT, CoreApp.C.Component.USER_BUTTON, CoreApp.C.Component.MENU_BUTTON ]`.

- `routePrefix`

    Defines the prefix of the routes to be used in provided links.

    Defaults to `/coreApp`.

- `verbosity`

    Defines the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `CoreApp.C.Verbose.NONE`

        Do not display any trace log to the console

    - `CoreApp.C.Verbose.CONFIGURE`

        Trace `CoreApp.configure()` calls and their result

    - `CoreApp.C.Verbose.PAGE`

        Trace changes on page and relevant authorizations

Please note that `CoreApp.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `CoreApp.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## NPM peer dependencies

Starting with v 0.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.0.0:

```js
    'ellipsize': '^0.5.1',
    'lodash': '^4.17.0',
    'strftime': '^0.10.2',
    '@vestergaard-company/js-mixin': '^1.0.3'
```

Each of these dependencies should be installed at application level:

```sh
    meteor npm install <package> --save
```

## Translations

New and updated translations are willingly accepted, and more than welcome. Just be kind enough to submit a PR on the [Github repository](https://github.com/trychlos/pwix-core-app/pulls).

## Cookies and comparable technologies

None at the moment.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-core-app/issues).

---
P. Wieser
- Last updated on 2024, Jul. 29th
