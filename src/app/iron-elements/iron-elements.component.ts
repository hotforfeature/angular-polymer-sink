import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { OnPolymerChange, PolymerProperty } from '@codebakery/origami';

@Component({
  selector: 'app-iron-elements',
  templateUrl: 'iron-elements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IronElementsComponent implements OnPolymerChange {
  @PolymerProperty() ironCollapseOpened;
  @PolymerProperty() ironListItems = [
    {
      id: 1,
      value: 'Hello'
    },
    {
      id: 2,
      value: 'World'
    }
  ];

  constructor(private changeRef: ChangeDetectorRef) { }

  onPolymerChange() {
    this.changeRef.detectChanges();
  }
}
