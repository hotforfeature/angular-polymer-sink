import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { OnPolymerChange, PolymerProperty } from '@codebakery/origami';

@Component({
  selector: 'app-paper-ui-elements',
  templateUrl: 'paper-ui-elements.component.html',
  styleUrls: [
    '../theme.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaperUiElementsComponent implements OnPolymerChange {
  // <paper-button>
  @PolymerProperty() paperButtonActive = false;
  @PolymerProperty() paperButtonDisabled = false;
  @PolymerProperty() paperButtonFocused = false;
  @PolymerProperty() paperButtonNoInk = false;
  @PolymerProperty() paperButtonRaised = false;
  @PolymerProperty() paperButtonToggles = false;

  constructor(private changeRef: ChangeDetectorRef) { }

  onPolymerChange() {
    this.changeRef.detectChanges();
  }
}
