import { NgModule } from '@angular/core';

import { PolymerTemplateDirective } from './polymer-template.directive';
import { PolymerDirective } from './polymer.directive';

@NgModule({
  declarations: [
    PolymerDirective,
    PolymerTemplateDirective
  ],
  exports: [
    PolymerDirective,
    PolymerTemplateDirective
  ]
})
export class PolymerModule { }
