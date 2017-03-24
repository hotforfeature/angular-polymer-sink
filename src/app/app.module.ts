import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PolymerModule } from './angular-polymer';
import { PaperElementsModule } from './angular-polymer/paper-elements';
import { AppComponent } from './app.component';
import { PaperInputElementsComponent } from './paper-input-elements/paper-input-elements.component';
import { PaperUiElementsComponent } from './paper-ui-elements/paper-ui-elements.component';

@NgModule({
  declarations: [
    AppComponent,
    PaperInputElementsComponent,
    PaperUiElementsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PolymerModule,
    PaperElementsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
