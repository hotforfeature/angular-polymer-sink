import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { OnPolymerChange, PolymerProperty } from '../angular-polymer';

@Component({
  selector: 'app-paper-input-elements',
  templateUrl: 'paper-input-elements.component.html',
  styleUrls: [
    '../theme.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaperInputElementsComponent implements OnPolymerChange {
  // <paper-checkbox>
  @PolymerProperty() paperCheckboxChecked;
  @PolymerProperty() paperCheckboxDisabled;
  // <paper-dropdown-menu>
  @PolymerProperty() paperDropdownMenuSelectedLabel;
  @PolymerProperty() paperDropdownMenuDisabled;
  // <paper-input>
  @PolymerProperty() paperInputValue;
  // <paper-listbox>
  @PolymerProperty() paperListboxMulti;
  paperListboxSelectedJson: string;

  private _paperListboxSelected: any;

  get paperListboxSelected() {
    return this._paperListboxSelected;
  }

  set paperListboxSelected(selected: any) {
    selected = PolymerProperty.unwrap(selected);
    this._paperListboxSelected = selected;
    this.paperListboxSelectedJson = JSON.stringify(selected, undefined, 2);
  }

  // <paper-radio-button>
  @PolymerProperty() paperRadioButtonChecked;
  @PolymerProperty() paperRadioButtonDisabled;
  // <paper-radio-group>
  @PolymerProperty() paperRadioGroupSelected;
  // <paper-slider>
  @PolymerProperty() paperSliderValue;
  @PolymerProperty() paperSliderDisabled;
  // <paper-toggle-button>
  @PolymerProperty() paperToggleButtonValue;
  @PolymerProperty() paperToggleButtonDisabled;

  constructor(private changeRef: ChangeDetectorRef) { }

  onPolymerChange() {
    this.changeRef.detectChanges();
  }
}
