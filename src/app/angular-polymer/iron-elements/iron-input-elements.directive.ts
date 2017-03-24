import { Directive } from '@angular/core';

import { PolymerDirective } from '../polymer.directive';

@Directive({
  selector: `iron-dropdown, iron-form, iron-input, iron-label`
})
export class IronInputElementsDirective extends PolymerDirective { }
