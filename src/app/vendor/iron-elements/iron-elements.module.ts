import { NgModule } from '@angular/core';

import { IronElementsDirective } from './iron-elements.directive';
import { IronInputElementsDirective } from './iron-input-elements.directive';

@NgModule({
  declarations: [
    IronElementsDirective,
    IronInputElementsDirective
  ],
  exports: [
    IronElementsDirective,
    IronInputElementsDirective
  ]
})
export class IronElementsModule { }
