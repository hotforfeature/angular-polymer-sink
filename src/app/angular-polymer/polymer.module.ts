import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IronControl } from './forms';
import { PolymerTemplateDirective } from './polymer-template.directive';
import { PolymerDirective } from './polymer.directive';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    IronControl,
    PolymerDirective,
    PolymerTemplateDirective
  ],
  exports: [
    IronControl,
    PolymerDirective,
    PolymerTemplateDirective
  ]
})
export class PolymerModule { }
