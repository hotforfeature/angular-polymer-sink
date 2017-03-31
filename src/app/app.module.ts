import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PolymerModule } from '@codebakery/origami';
import { IronElementsModule, PaperElementsModule } from '@codebakery/origami/lib/collections';

import { AppComponent } from './app.component';
import { IronElementsComponent } from './iron-elements/iron-elements.component';
import { PaperInputElementsComponent } from './paper-input-elements/paper-input-elements.component';
import { ReactiveFormComponent } from './paper-input-elements/reactive-form.component';
import { TemplateFormComponent } from './paper-input-elements/template-form.component';
import { PaperUiElementsComponent } from './paper-ui-elements/paper-ui-elements.component';

@NgModule({
  declarations: [
    AppComponent,
    IronElementsComponent,
    PaperInputElementsComponent,
    PaperUiElementsComponent,
    ReactiveFormComponent,
    TemplateFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IronElementsModule,
    PolymerModule,
    PaperElementsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
