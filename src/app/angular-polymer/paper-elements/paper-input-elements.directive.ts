import { Directive } from '@angular/core';

import { PolymerDirective } from '../polymer.directive';

@Directive({
  selector: `paper-checkbox, paper-dropdown-menu, paper-input, paper-listbox, paper-radio-button,
    paper-radio-group, paper-slider, paper-toggle-button`
})
export class PaperInputElementsDirective extends PolymerDirective { }
