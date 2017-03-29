import { NgModule } from '@angular/core';

import { PaperDropdownMenuControl, PaperInputControl } from './paper-input-controls';
import { PaperInputElement } from './paper-input-elements';
import { PaperUiElement } from './paper-ui-elements';

@NgModule({
  declarations: [
    PaperDropdownMenuControl,
    PaperInputControl,
    PaperInputElement,
    PaperUiElement
  ],
  exports: [
    PaperDropdownMenuControl,
    PaperInputControl,
    PaperInputElement,
    PaperUiElement
  ]
})
export class PaperElementsModule { }
