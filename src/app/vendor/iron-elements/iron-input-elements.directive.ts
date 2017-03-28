import { Directive } from '@angular/core';

import { PolymerDirective } from '../../angular-polymer';

@Directive({
  selector: `iron-dropdown, iron-form, iron-input, iron-label`
})
export class IronInputElementsDirective extends PolymerDirective { }
