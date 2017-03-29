import { NgModule } from '@angular/core';

import {
  PaperDropdownMenuControl,
  PaperInputControl,
  PaperSliderControl
} from './paper-input-controls';
import { PaperInputElement } from './paper-input-elements';
import { PaperUiElement } from './paper-ui-elements';

@NgModule({
  declarations: [
    PaperDropdownMenuControl,
    PaperInputControl,
    PaperInputElement,
    PaperSliderControl,
    PaperUiElement
  ],
  exports: [
    PaperDropdownMenuControl,
    PaperInputControl,
    PaperInputElement,
    PaperSliderControl,
    PaperUiElement
  ]
})
export class PaperElementsModule { }
