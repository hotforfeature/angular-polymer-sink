import { NgModule } from '@angular/core';

import { PaperInputElementsModule } from './paper-input-elements.module';
import { PaperUiElementsModule } from './paper-ui-elements.module';

@NgModule({
  imports: [
    PaperInputElementsModule,
    PaperUiElementsModule
  ],
  exports: [
    PaperInputElementsModule,
    PaperUiElementsModule
  ]
})
export class PaperElementsModule { }
