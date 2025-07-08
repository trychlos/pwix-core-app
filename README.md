# pwix:core-app

## What is it ?

The `pwix:core-app` package provides a common framework to applications by gathering needed elementary other packages:

- define some common semantics, along with the corresponding `AppPages.RunContext` helpers:

    - to be configure()'d:

        - name: the application short name

            It is not localized, and doesn't depend of the running environment

    - to be setup in environment settings:

        - contact: a contact email address, defaulting to 'no-reply@localhost'
        - copyright: a copyright string, defaulting to none
        - label: the label of the application, defaulting to the application name
        - logo: the path to the logo image, defaulting to '/packages/pwix_core-app/resources/favicon.svg'
        - sender: the sender address of all emails sent by the application, defaulting to 'no-reply@localhost'
        - title: the title of the browser window, defaulting to the application name

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

#### `coreAppMain`

The topmost component of each displayed page of the application.

It takes care of:

- set the browser window title from the label read from environment settings
- keeping the running data context,
- hosting the Tolert (pwix:tolert) messages,
- hosting the Cookies Manager (pwix:cookies-manager) messages

and then run the `coreAppLayout` component.

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

#### `coreLogin`

Encapsulates the `acUserLogin` component from `pwix:accounts-ui` package.

#### `corePoweredBy`

Display a localized link as 'Powered by Meteor'.

#### `coreSaa`

Encapsulates the `saaCreate` component from `pwix:startup-app-admin` package.

### Less mixins

#### `.x-btn-variant( @color )`

#### `.x-btn-outline-variant( @color )`

## Configuration

The package's behavior can be configured through a call to the `CoreApp.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `appName`

    Defines the name of the application role. By convention, this name is also a key in settings, and contain an `environments` object addressed by the `APP_ENV` environment variable on the server.

    Should be considered as mandatory and many features rely on that.

- `appCopyrightTemplate`

    Defines the copyright to tbe displayed as an async function which returns a `{ template, data }` object. Prototype is so: `async fn(): Object{ template, data }`.

    Defaults to local `local_copyright()` function which displays a 'PWI Consulting' copyright.

- `appHomeTemplate`

    Defines the (public) home page to be displayed as an async function which returns a `{ template, data }` object. Prototype is so: `async fn(): Object{ template, data }`.

    Defaults to local `local_home_label()` function which displays the application name and label in the middle of the page.

    Note that `pwix:core-app` also proposes a `local_home_inline()` function which displays an inline-edited document named `core-home-hero-01` from the default collection.

- `colorTheme`

    Defines the default color class for the theme. This class is added to the `coreAppLayout` top component.

    Defaults to `t-default-color`.

- `haveContentsManager`

    Whether the 'Managers' page has a 'Contents Manager' tab.

    Defaults to `false`.

- `layoutTheme`

    Defines the default layout class for the theme. This class is added to the `coreAppLayout` top component.

    Defaults to `t-default-layout`.

- `loginIfNotConnected`

    What to do when the non-connected user asks for a non-permitted page ? Either go back to the (expected-to-be-public) home page, or requests a login.

    Defaults to `false`: the user is redirected to the home page, which is expected to be public.

    When set to `true`, the user will be proposed a full page login screen.

- `loginImage`

    The path to an image rendered besides of the login panel.

    Defaults to `/packages/pwix_core-app/resources/login-image.svg`.

- `mainMenu`

    Defines the name of the main menu displayed in the header of the pages.

    Defaults to `coreAppMenu`.

- `managedLanguages`

    Defines the list of languages managed by the application.

    Defaults to none.

- `routePrefix`

    Defines the prefix of the routes to be used in provided links.

    Defaults to `/core-app`.

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
