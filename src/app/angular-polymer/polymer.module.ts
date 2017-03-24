import { NgModule } from '@angular/core';

import { PolymerDirective } from './polymer.directive';

@NgModule({
  declarations: [
    PolymerDirective
  ],
  exports: [
    PolymerDirective
  ]
})
export class PolymerModule { }
