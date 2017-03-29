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
  // <paper-input>
  @PolymerProperty() paperInputValue;
  // <paper-radio-button>
  @PolymerProperty() paperRadioButtonChecked;
  @PolymerProperty() paperRadioButtonDisabled;
  // <paper-radio-group>
  @PolymerProperty() paperRadioGroupSelected;

  constructor(private changeRef: ChangeDetectorRef) { }

  onPolymerChange() {
    this.changeRef.detectChanges();
  }

  onPaperRadioGroupSelectedItem(e: CustomEvent) {
    console.log('<paper-radio-group> selectedItem', e.detail.value);
  }
}
