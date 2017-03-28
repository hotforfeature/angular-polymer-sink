import { NgModule } from '@angular/core';

import { PaperInputElementsDirective } from './paper-input-elements.directive';
import { PaperUiElementsDirective } from './paper-ui-elements.directive';

@NgModule({
  declarations: [
    PaperInputElementsDirective,
    PaperUiElementsDirective
  ],
  exports: [
    PaperInputElementsDirective,
    PaperUiElementsDirective
  ]
})
export class PaperElementsModule { }
