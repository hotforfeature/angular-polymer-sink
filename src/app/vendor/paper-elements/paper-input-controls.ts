import { Directive, OnInit, Provider, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { IronControl } from '../../angular-polymer';

export const PAPER_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaperInputControl),
  multi: true
};

@Directive({
  selector: `paper-checkbox, paper-input, paper-listbox, paper-radio-button, paper-radio-group,
    paper-slider, paper-toggle-button`,
  providers: [PAPER_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PaperInputControl extends IronControl { }

export const PAPER_DROPDOWN_MENU_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaperDropdownMenuControl),
  multi: true
};

@Directive({
  selector: `paper-dropdown-menu`,
  providers: [PAPER_DROPDOWN_MENU_CONTROL_VALUE_ACCESSOR]
})
export class PaperDropdownMenuControl extends IronControl implements OnInit {
  ngOnInit() {
    this.ironSelector = this.elementRef.nativeElement.querySelector('.dropdown-content') ||
      this.elementRef.nativeElement.children[0];
    super.ngOnInit();
  }
}

