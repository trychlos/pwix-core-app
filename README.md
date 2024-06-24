# pwix:core-app

## What is it ?

A meta-package which embeds our application most common codes, both on client and server sides.

This package:

- is not designed to be published (probably cannot be used in any application)
- is expected to be added to an application (not required by a package), bringing with it most common dependencies.

It materializes our design decisions about user interface and server code architecture:

- deep copy, deep equal and other Object functions are handled by lodash, and check_npms takes care of requiring it
- it is Bootstrap-based, so check_npms takes care of requiring @popperjs/core and bootstrap
- embeds (and provides) latest FontAwesome copy
- requires pwix:layout package, so that is able to provide responsive layout utilities which adapt to the device
- provides the Page class to handle pages and routes in an organized way
- provides the Authorization class to handle permissions
- requires pwix:modal, pwix:tolert, pwix:bootbox for dialogs management

## Features

### Environment management

While `nodejs` defines only three environments (`development`, `staging` and `production`), and though Meteor has followed the same route, we strongly believe that many more would be better, and that we should not be tied to such only three parts.

We so use the `APP_ENV` environment variable to address our own environment identifier. Through this identifier, we ask the server to publish the setings recorded inside of its private settings (see `pwix:env-settings`).

The settings are read from the server settings for this environment through the path `Meteor.settings[APP.name].environments[<environment_identifier>]`.

If not specified in the `APP_ENV` variable, the environment identifier falls back to the `nodejs` environment name.

### Layout management

The layout is actually eventually computed from the current page and the current display.

From our point of view:

- `CoreApp` holds a default `l-app` layout, which can be configured.

- Each page define its own layout, though if relies most often on the default layout.

These two steps are display-independant.

### Forms management

`pwix:core-app` provides classes to make easier the forms management.

Each class may be used as is, and can also be derived by the application.

- `CoreApp.FormChecker`

    A class to be instanciated (or derived) by each component which would take advantage of it.

### Pages management

`pwix:core-app` provides classes to manage the pages collection, the current page and the roles which may be associated with it.

Each class may be used as is, and can also be derived by the application.

- `CoreApp.PagesCollection`

    The collection of defined `CoreApp.Page` as a singleton.

- `CoreApp.Page`

    A page definition.

- `CoreApp.PageCurrent`

    The current page. Each method is itself a reactive data source.

### Settings management

`pwix:core-app` the settings dedicated to the current environment as the `CoreApp.envSettings` reactive var.

## Provides

### `CoreApp`

The exported `CoreApp` global object provides following items:

#### `CoreApp.envSettings`

A ReactiveVar which is set at startup with the settings for this environment. It contains following keys:

- `env`: the name of the running environment from `APP_ENV` environment variable
- `settings`: the relevant settings read from the APP/private/config/server JSON configuration.

#### Functions

##### `CoreApp.i18n.namespace()`

Returns the i18n namespace used by the package. Used to add translations at runtime.

### Blaze components

#### `coreCookiesLink`

Display a link to the Cookies Policy.

Parameters can be provided:

- label, defaulting to 'Cookies management policy'
- title, defaulting to 'Cookies management policy'
- route, defaulting to configured routePrefix + '/cookies'.

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

- label, defaulting to 'Privacy Policy'
- title, defaulting to 'Privacy Policy'
- route, defaulting to configured routePrefix + '/gdpr'.

#### `coreGTULink`

Display a link to the General Terms of Use.

Parameters can be provided:

- label, defaulting to 'General Terms of Use'
- title, defaulting to 'General Terms of Use'
- route, defaulting to configured routePrefix + '/gtu'.

#### `coreLegalsLink`

Display a link to the Legal Informations.

Parameters can be provided:

- label, defaulting to 'Legal Informations'
- title, defaulting to 'Legal Informations'
- route, defaulting to configured routePrefix + '/legals'.

### Less mixins

#### `.x-btn-variant( @color )`

#### `.x-btn-outline-variant( @color )`

## Configuration

The package's behavior can be configured through a call to the `CoreApp.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `adminRole`

    Define the name of the **application administrator** role.

    Default to 'APP_ADMINISTRATOR'.

    As a reminder, this same value is expected to be also configured in the `pwix:startup-app-admin` package.

- `layout`

    Define the name of the default layout for a page which doesn't define it.

    Default to 'app'.

    This layout is expected to be provided by the application.

- `routePrefix`

    Define the prefix of the routes to be used in provided links.

    Default to `/coreUI`.

- `classes`

    A list of classes to be added to display units.

    Default to `[ 't-page' ]`.

- `verbosity`

    Define the expected verbosity level.

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

Dependencies as of v 0.3.0:

```js
    '@popperjs/core': '^2.11.6',
    'bootstrap': '^5.2.1',
    'lodash': '^4.17.0'
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
- Last updated on 2023, June 5th
