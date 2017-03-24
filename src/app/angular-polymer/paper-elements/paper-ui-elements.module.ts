import { NgModule } from '@angular/core';

import { PaperUiElementsDirective } from './paper-ui-elements.directive';

@NgModule({
  declarations: [
    PaperUiElementsDirective
  ],
  exports: [
    PaperUiElementsDirective
  ]
})
export class PaperUiElementsModule { }
