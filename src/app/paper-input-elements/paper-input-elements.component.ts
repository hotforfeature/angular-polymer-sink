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
  @PolymerProperty() paperCheckboxActive;
  @PolymerProperty() paperCheckboxChecked;
  @PolymerProperty() paperCheckboxDisabled;
  @PolymerProperty() paperCheckboxInvalid;

  constructor(private changeRef: ChangeDetectorRef) { }

  onPolymerChange() {
    this.changeRef.detectChanges();
  }
}
