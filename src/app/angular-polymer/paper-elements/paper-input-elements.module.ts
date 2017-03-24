import { NgModule } from '@angular/core';

import { PaperInputElementsDirective } from './paper-input-elements.directive';

@NgModule({
  declarations: [
    PaperInputElementsDirective
  ],
  exports: [
    PaperInputElementsDirective
  ]
})
export class PaperInputElementsModule { }
