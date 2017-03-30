# Angular-Polymer Sink

This kitchen sink demos the latest version of Angular and Polymer working together.

## Element Issues

The following elements are included in the repository with modifications to make them work with Polymer 2.0. Each section below explains what needs to be done before the element can be removed from the repository.

### paper-button
- Waiting for https://github.com/PolymerElements/paper-button/pull/145 to be merged.

# angular-polymer

The angular-polymer library bridges gaps between the Angular framework and Polymer-built custom elements. It will additionally work with any custom element, provided the element follows Polymer conventions for events and properties.

## Library and Browser Support

angular-polymer targets Angular 4+ and Polymer 2+. It is not compatible with earlier versions. The library targets the v1 spec for custom elements and shadow dom.

[Custom elements](http://caniuse.com/#feat=custom-elementsv1) are one piece of a larger WebComponents environment. The other pieces are [templates](http://caniuse.com/#feat=template), [HTML imports](http://caniuse.com/#feat=imports), and [Shadow DOM](http://caniuse.com/#feat=shadowdomv1).

[Polyfills are available](https://www.webcomponents.org/polyfills) and support the following browsers:

- Chrome
- Opera
- Firefox
- Safari 7+
- Edge/IE11+

## Quick Start

- [What should my index.html and main.ts look like?](#polyfills)
- [Where do I import elements?](#import-elements)
- [What do I need to import in my module?](#import-polymermodule)
- [How do use two-way data binding?](#two-way-setup)
- [What two-way binding with non-Polymer elements?](#two-way-databinding)
- [What if I use OnPush change detection?](#change-detection)
- [How do I make an element work with Angular forms?](#forms-setup)
- [What about non-Polymer form elements?](#forms)
- [Can I use templates for an element?](#polymer-templates)

### Installation

TODO: The angular-polymer folder needs to be its own repository and distributed separate from the kitchen sink demo

### Setup

Before using Angular and Polymer together, the app must first:

1. [Setup Bower](#bower)
2. [Enable template support](#templates)
3. [Load polyfills](#polyfills)

#### Bower

Angular uses `npm` for its dependencies, while most custom element libraries are installed with [`bower`](https://bower.io/).

```
$ npm install -g bower
$ cd my-angular-polymer-app
$ bower init
```

The following is a suggestion based off of the project structure for an Angular CLI-generated projected, but any project can use `bower` components if the `bower_components/` directory is included in the build.

By default, the Angular CLI includes all files in the `src/assets/` folder. Create a `.bowerrc` file in the project root with the following content:

```json
{
  "directory": "src/assets/bower_components"
}
```

You may also consider adding `/src/assets/bower_components` to your `.gitignore` or other repository ignore file.

When you are ready to install a bower component, be sure to persist it to `bower.json` with the save flag.

```
$ bower install --save Polymer/polymer
```

#### Templates

For backwards compatibility, Angular 4 consumes all `<template>` elements. This can be disabled by setting `enableLegacyTemplate` to false when bootstrapping.

Angular 5+ will default this value to false.

```ts
platformBrowserDynamic().bootstrapModule(AppModule, {
  enableLegacyTemplate: false
});
```

This means that all Angular templates must use `<ng-template>`, while all Polymer templates will use `<template>`.

##### BROKEN

`enableLegacyTemplate` is not currently working. See https://github.com/angular/angular/issues/15555

To get around this, an included `polymer-template` attribute directive is included in the library. Use it on an `<ng-template>` element to convert it to a `<template>` for Polymer at runtime.

```html
<iron-list [items]="items">
  <ng-template polymer-template>
    <div>[[item]]</div>
  </ng-template>
</iron-list>
```

#### Polyfills

When targeting browsers that do not natively support all WebComponent pieces, polyfills are required. When using polyfills, remember that the app must wait for the `WebComponentsReady` event before bootstrapping.

This library recommends using the `webcomponents-loader.js` polyfill. This script will check for native browser support before loading the required polyfills.

index.html
```html
<html>
<head>
  <meta charset="utf-8">
  <title>Angular-Polymer App</title>
  <base href="/">

  <script src="assets/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
  <link href="assets/bower_components/paper-button/paper-button.html" rel="import">
</head>
<body>
  <app-root>Loading...</app-root>
  <script>
    // For browsers that support webcomponents, the loader will immediately fire the ready event
    // before Angular bootstraps. This flag will let main.ts know to continue rather than wait for
    // the event.
    window.webComponentsReady = false;
    window.addEventListener('WebComponentsReady', function() {
      window.webComponentsReady = true;
    });
  </script>
</body>
</html>
```

main.ts
```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule);
}

if ((<any>window).webComponentsReady) {
  // Polyfills not needed
  bootstrap();
} else {
  // Wait for polyfills before bootstrapping
  window.addEventListener('WebComponentsReady', bootstrap);
}
```

## Usage

### Import Elements

All elements should be imported in the `index.html` file. `<link>`s in Angular templates will not work since Angular pre-processes those templates.

At the moment there is no build tool like vulcanize to concatenate all imports into a single HTML file. The app must include the `bower_components/` directory in its build.

index.html
```html
<html>
<head>
  <meta charset="utf-8">
  <title>Angular-Polymer App</title>
  <base href="/">

  <script src="assets/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
  <!-- Import elements here -->
  <link href="assets/bower_components/paper-button/paper-button.html" rel="import">
  <link href="assets/bower_components/paper-input/paper-input.html" rel="import">
</head>
...
```

### Import PolymerModule

To use angular-polymer's directives, import the module.

Additionally, support should be added for custom elements. Angular will throw a compile error when it reaches an element it doesn't recognize.

app.module.ts
```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerModule } from 'angular-polymer';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    PolymerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Two-Way Databinding

Custom element properties can be one-way bound easily and natively in Angular. After all, they're just properties.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-poly',
  template: `
    <label>Disabled</label>
    <input type="checkbox" [(ngModel)]="isDisabled">

    <paper-button [disabled]="isDisabled"></paper-button>
  `
})
export class PolyComponent {
  isDisabled: boolean;
}
```

Two-way binding is more complicated. Angular listens for a <em>property</em>Change event when using the `[()]` syntax, while Polymer fires a <em>property</em>-changed event.

The app can still listen to those events natively, but things are starting to look extremely verbose.

```ts
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-poly',
  template: `
    <label>Disabled</label>
    <input type="checkbox" [(ngModel)]="isDisabled">
    <button (click)="toggleDisabled()">Update from Polymer</button>

    <paper-button #paperButton [disabled]="isDisabled"
        (disabled-change)="isDisabled = $event.detail.value"></paper-button>
  `
})
export class PolyComponent {
  isDisabled: boolean;
  @ViewChild('paperButton') paperButton: any;

  toggleDisabled() {
    this.paperButton.disabled = !this.paperButton.disabled;
  }
}
```

angular-polymer introduces the `[polymer]` directive. This directive will map Polymer change events to Angular change events, allowing two-way data binding with the `[()]` syntax.

```ts
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-poly',
  template: `
    <label>Disabled</label>
    <input type="checkbox" [(ngModel)]="isDisabled">
    <button (click)="toggleDisabled()">Update from Polymer</button>

    <paper-button #paperButton polymer [(disabled)]="isDisabled"></paper-button>
  `
})
export class PolyComponent {
  isDisabled: boolean;
  @ViewChild('paperButton') paperButton: any;

  toggleDisabled() {
    this.paperButton.disabled = !this.paperButton.disabled;
  }
}
```

This works, but now `isDisabled` is set to a `CustomEvent` whenever it is changed from Polymer. `[(disabled)]="isDisabled"` desugars to `[disabled]="isDisabled" (disabledChange)="isDisabled = $event`. We're looking for the value of `event.detail`.

We can decorate the `isDisabled` property to automatically unwrap Polymer events.

```ts
import { Component, ViewChild } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerProperty } from 'angular-polymer';

@Component({
  selector: 'app-poly',
  template: `
    <label>Disabled</label>
    <input type="checkbox" [(ngModel)]="isDisabled">
    <button (click)="toggleDisabled()">Update from Polymer</button>

    <paper-button #paperButton polymer [(disabled)]="isDisabled"></paper-button>
  `
})
export class PolyComponent {
  @PolymerProperty() isDisabled: boolean;
  @ViewChild('paperButton') paperButton: any;

  toggleDisabled() {
    this.paperButton.disabled = !this.paperButton.disabled;
  }
}
```

Now `isDisabled` changes to the correct boolean value when changed from Polymer! `@PolymerProperty()` works under the hood by replacing the property with custom getters and setters. What if the property already has a setter?

TypeScript compiles in such a way that the class getter/setter take priority over anything a property decorator might define on its target. Instead of using the decorator, we can use `PolymerProperty.unwrap()` in the setter.

```ts
import { Component, ViewChild } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerProperty } from 'angular-polymer';

@Component({
  selector: 'app-poly',
  template: `
    <label>Disabled</label>
    <input type="checkbox" [(ngModel)]="isDisabled">
    <button (click)="toggleDisabled()">Update from Polymer</button>

    <paper-button #paperButton polymer [(disabled)]="isDisabled"></paper-button>
  `
})
export class PolyComponent {
  private _isDisabled: boolean;

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  set isDisabled(value: boolean) {
    // Value may be a boolean or a CustomEvent from Polymer
    value = PolymerProperty.unwrap(value);
    this._isDisabled = value;
  }

  @ViewChild('paperButton') paperButton: any;

  toggleDisabled() {
    this.paperButton.disabled = !this.paperButton.disabled;
  }
}
```

<a name="two-way-setup"></a>
#### Library Selectors

The `[polymer]` directive will convert any custom element (that follows Polymer's <em>property-changed</em> event syntax) into an element that can be easily databound with `@PolymerProperty()`.

Some libraries may provide additional modules to automatically apply the `[polymer]` directive. angular-polymer provides Polymer's collections as an optional import.

app.module.ts
```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerModule, PaperElementsModule } from 'angular-polymer';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    PolymerModule,
    PaperElementsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

poly.component.ts
```ts
import { Component, ViewChild } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerProperty } from 'angular-polymer';

@Component({
  selector: 'app-poly',
  template: `
    <label>Disabled</label>
    <input type="checkbox" [(ngModel)]="isDisabled">
    <button (click)="toggleDisabled()">Update from Polymer</button>

    <!-- PaperElementsModule automatically upgrades paper-button -->
    <paper-button #paperButton [(disabled)]="isDisabled"></paper-button>
  `
})
export class PolyComponent {
  @PolymerProperty() isDisabled: boolean;
  @ViewChild('paperButton') paperButton: any;

  toggleDisabled() {
    this.paperButton.disabled = !this.paperButton.disabled;
  }
}
```

#### Recap (TL;DR;)

To use a custom element in Angular without any headache:

1. Add the `[polymer]` attribute (or import a module that does this for you)
2. Use `@PolymerProperty()` decorators on properties bound to custom elements
3. Optionally use `PolymerProperty.unwrap` on properties with setters

### Change Detection

Angular dynamically fires off a round of change detection at several key moments in an application. It is possible to gain performance and cut down on unnecessary change detections using `ChangeDetectionStrategy.OnPush`.

What if Polymer updates a property? How does Angular know to re-run change detection?

If using `ChangeDetectionStrategy.OnPush` for a component, that component should also implement `OnPolymerChange` to determine if change detection needs to run.

```ts
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerProperty, OnPolymerChange } from 'angular-polymer';

@Component({
  selector: 'app-poly',
  template: `
    <label>Disabled</label>
    <input type="checkbox" [(ngModel)]="isDisabled">

    <paper-button [(disabled)]="isDisabled"></paper-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolyComponent implements OnPolymerChange {
  @PolymerProperty() isDisabled: boolean;

  constructor(private changeRef: ChangeDetectorRef) { }

  onPolymerChange(property?: string, event?: CustomEvent, detail?: any) {
    // property - the name of the property changed
    // event - the CustomEvent fired from Polymer
    // detail - event.detail
    this.changeRef.detectChanges();
  }
}
```

### Forms

Angular's template (ngModel) and reactive (formControl) forms are a core part of many applications. Polymer provides several core behaviors in its Iron Elements collection that define form elements.

For example, a `<paper-checkbox>` has a `checked` attribute that we can bind to.

```ts
import { Component } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerProperty } from 'angular-polymer';

@Component({
  selector: 'app-poly',
  template: `
    <form #ngForm="ngForm">
      <paper-checkbox [(checked)]="isChecked" required></paper-checkbox>
      <button type="submit" [disabled]="!ngForm.form.valid">Submit</button>
    </form>
  `
})
export class PolyComponent {
  @PolymerProperty() isChecked: boolean;
}
```

The submit button is enabled since the `<paper-checkbox>` does not have a corresponding `NgControl` (specifically an `NgModel` for this template-driven form). Therefore the Angular form cannot check its validity.

Just like the `[polymer]` directive, angular-polymer provides the `[ironControl]` directive that works similarly. This directive assumes a control implements one of the following Polymer behaviors:

- IronFormElementBehavior
- IronCheckedElementBehavior
- IronSelectableBehavior

A warning will be generated in the console if `[ironControl]` can't support the custom element.

```ts
import { Component } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerProperty } from 'angular-polymer';

@Component({
  selector: 'app-poly',
  template: `
    <form #ngForm="ngForm">
      <paper-checkbox ironControl [(ngModel)]="isChecked" required></paper-checkbox>
      <button type="submit" [disabled]="!ngForm.form.valid">Submit</button>
    </form>
  `
})
export class PolyComponent {
  @PolymerProperty() isChecked: boolean;
}
```

Now the submit button is disabled until the `<paper-checkbox>` is checked! `[ironControl]` also works with reactive forms.

#### IronSelectableBehavior

Sometimes (looking at you `<paper-dropdown-menu>`) an element will implement IronFormElementBehavior, but wraps an Iron Selectable component. In these cases, add `[ironControl]` to the host element and specify an `[ironSelector]` element reference that the control should use.

```ts
import { Component } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerProperty } from 'angular-polymer';

@Component({
  selector: 'app-poly',
  template: `
    <form #ngForm="ngForm">
      <!-- paper-dropdown-menu is the control -->
      <paper-dropdown-menu ironControl [(ngModel)]="selectedItem" [ironSelector]="listbox" required>
        <!-- but paper-listbox is the IronSelectable -->
        <paper-listbox #listbox attr-for-selected="value">
          <paper-item value="item-1">Item 1</paper-item>
          <paper-item value="item-2">Item 2</paper-item>
          <paper-item value="item-3">Item 3</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>

      <button type="submit" [disabled]="!ngForm.form.valid">Submit</button>
    </form>
  `
})
export class PolyComponent {
  @PolymerProperty() selectedItem: string;
}
```

#### Validation

Additionally, `[ironControl]` will run any validation a custom element may have implemented with IronValidatableBehavior.

Any Angular validations will also affect the element's `invalid` property. This means you can use the element's native validation to determine validity, as well as apply additional custom validation through Angular.

In our example, `<paper-checkbox>` implements a required validation check. Angular also provides a validator with `Validators.required` when it detects the `required` attribute. In our scenario, we are actually running two validation checks (one for Angular and one for Polymer).

When `<paper-checkbox>` is not checked, `NgModel.errors` is equal to:

```js
{
  "required": true, // Angular validation
  "polymer": true // IronValidatableBehavior validation
}
```

This error structure is important when displaying dynamic error messages to the user. IronValidatableBehavior emits a single result (true or false) if validation fails. It does not specify the exact error like Angular does. If `polymer` is set to true, that means the custom element's validation failed.

<a name="forms-setup"></a>
#### Library Selectors

Just like `[polymer]`, angular-polymer ships with several built-in selectors for the core Polymer collections that automatically apply `[ironControl]` to elements.

app.module.ts
```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerModule, PaperElementsModule } from 'angular-polymer';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    PolymerModule,
    PaperElementsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

app.component.ts
```ts
import { Component } from '@angular/core';
// TODO: Package angular-polymer separately
import { PolymerProperty } from 'angular-polymer';

@Component({
  selector: 'app-poly',
  template: `
    <form #ngForm="ngForm">
      <!-- No ironControl needed, is Just Works (TM) -->
      <paper-checkbox [(ngModel)]="isChecked" required></paper-checkbox>

      <!-- Remember our friend? The module also fixes the ironSelector issue -->
      <paper-dropdown-menu [(ngModel)]="selectedItem" required>
        <paper-listbox attr-for-selected="value">
          <paper-item value="item-1">Item 1</paper-item>
          <paper-item value="item-2">Item 2</paper-item>
          <paper-item value="item-3">Item 3</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>

      <button type="submit" [disabled]="!ngForm.form.valid">Submit</button>
    </form>
  `
})
export class PolyComponent {
  @PolymerProperty() isChecked: boolean;
  @PolymerProperty() selectedItem: string;
}
```

#### Recap (TL;DR;)

To enable template and reactive form cooperation between Angular and custom elements:

1. Add the `[ironControl]` attribute (or import a module that does this for you)
2. ???
3. Profit

Don't forget that

- Angular validation will update `invalid` on the custom element
- Custom element validation will update Angular

### Polymer Templates

[Remember that currently &lt;template&gt; elements are broken](#broken). When this documentation refers to using a `<template>` element, the app should use `<ng-template polymer-template>` until the linked issue is fixed.

There are three "templates" in Angular. Component templates, `<ng-template>`, and the native `<template>` element.

When Angular parses a component template, it will dynamically create elements using a Renderer. Polymer elements use Templatizer to stamp templates onto the DOM.

Angular is unaware of any DOM manipulations Polymer makes. This means that an app _cannot_ use an Angular component or syntax in a Polymer template. Polymer stamps the element onto the DOM, but Angular doesn't know it needs to instantiate the element.

Future support may change this, but at the moment remember the cardinal rule: **Angular has no power in Polymer templates**.

Let's take a look at `<iron-list>` for example:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-poly',
  template: `
    <iron-list [items]="items" as="item">
      <ng-template polymer-template>
        <div>[[item]]</div>
      </ng-template>
    </iron-list>
  `
})
export class PolyComponent {
  items = [
    'one',
    'two',
    'three'
  ];
}
```

Note the `[[]]` syntax. This is a Polymer template, which means we must use Polymer template syntax when data binding.

Similarly, we cannot use an Angular component inside our `<iron-list>`, since it will not be instantiated by Angular. It will simply be an HTMLUnknownElement that was stamped by Polymer.

Luckily there are few elements in Polymer where a user-defined template is needed. Many Polymer utility templates (such as `dom-if` and `dom-repeat`) are present in Angular as `*ngIf` and `*ngFor`.

When templates are required in a Polymer element, the app must fully commit and use only Polymer elements for data binding.

index.html
```html
<html>
<head>
  <meta charset="utf-8">
  <title>Angular-Polymer App</title>
  <base href="/">

  <script src="assets/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
  <link href="assets/bower_components/paper-button/paper-button.html" rel="import">
</head>
<body>
  <!-- If you want to define custom elements, they must be defined in "real" HTML,
  not a component template.

  We're defining it here in index.html, but we could create a my-item.html
  in `assets/my-item/my-item.html` and import it like a normal element -->
  <dom-module id="my-item">
    <template>
      <div>The item is [[item]]</div>
    </template>
    <script>
      // This example is a hybrid Polymer element that works in ES5
      // TypeScript will not transpile code here or in the assets folder
      Polymer({
        is: 'my-item',
        properties: {
          item: String
        }
      });
    </script>
  </dom-module>

  <app-root>Loading...</app-root>
  <script>
    // For browsers that support webcomponents, the loader will immediately fire the ready event
    // before Angular bootstraps. This flag will let main.ts know to continue rather than wait for
    // the event.
    window.webComponentsReady = false;
    window.addEventListener('WebComponentsReady', function() {
      window.webComponentsReady = true;
    });
  </script>
</body>
</html>
```

app.component.ts
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-poly',
  template: `
    <iron-list [items]="items" as="item">
      <ng-template polymer-template>
        <my-item item="[[item]]"></my-item>
      </ng-template>
    </iron-list>
  `
})
export class PolyComponent {
  items = [
    'one',
    'two',
    'three'
  ];
}
```
