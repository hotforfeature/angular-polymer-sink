import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Injector,
  OnDestroy,
  OnInit,
  Provider,
  Renderer,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { getTagName } from '../util';

export const IRON_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IronControl),
  multi: true
};

@Directive({
  selector: '[ironControl]',
  providers: [IRON_CONTROL_VALUE_ACCESSOR]
})
export class IronControl implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() ironSelector: any;

  protected onChange = (_: any) => {};
  protected onTouched = () => {};

  private ngControl: NgControl;
  private statusSub: Subscription;
  private ironCheckedElement = false;
  private ironSelectable = false;
  private ironMultiSelectable = false;
  private ironValidatable = false;

  constructor(private elementRef: ElementRef,
      private injector: Injector,
      private renderer: Renderer) { }

  ngOnInit() {
    const ironFormElement = 'value' in this.elementRef.nativeElement;
    this.ironCheckedElement = 'checked' in this.elementRef.nativeElement;
    this.ironSelector = this.ironSelector || this.elementRef.nativeElement;
    this.ironSelectable = Array.isArray(this.ironSelector.items);
    this.ironMultiSelectable = 'multi' in this.ironSelector;
    this.ironValidatable = typeof this.elementRef.nativeElement.validate === 'function';

    if (!ironFormElement && !this.ironCheckedElement && !this.ironSelectable) {
      console.warn(`${getTagName(this.elementRef)} does not implement IronFormElementBehavior, ` +
        `IronCheckedElementBehavior, or IronSelectableBehavior. If this element wraps an ` +
        `element with IronSelectableBehavior, add [ironSelector]="elementRef"`);
    }
  }

  ngAfterViewInit() {
    this.ngControl = this.injector.get(NgControl, undefined);
    if (!this.ngControl) {
      console.warn(`${getTagName(this.elementRef)} does not have an NgControl. Are you missing ` +
        `an ngModel or formControlName?`);
    } else {
      if (this.ironValidatable) {
        // Custom validators should update native element's validity
        this.statusSub = this.ngControl.statusChanges.subscribe(() => {
          this.elementRef.nativeElement.invalid = this.ngControl.dirty && this.ngControl.invalid;
        });

        // Native element's validate() will be called whenever Angular forms perform validation
        // checks. The side-effect of this is that <iron-form> is not required. Angular forms will
        // work just fine.
        this.ngControl.control.setValidators(Validators.compose([
          this.ngControl.control.validator,
          () => {
            if (this.elementRef.nativeElement.validate()) {
              return null;
            } else {
              // IronValidatableBehavior only tells us if something is wrong, not the specifics
              return {
                ironValidatable: true
              };
            }
          }
        ]));
      }
    }
  }

  ngOnDestroy() {
    if (this.statusSub) {
      this.statusSub.unsubscribe();
    }
  }

  writeValue(obj: any) {
    if (this.ironCheckedElement) {
      this.renderer.setElementProperty(this.elementRef.nativeElement, 'checked', Boolean(obj));
    } else if (this.ironSelectable || this.ironMultiSelectable) {
      if (this.elementRef.nativeElement.multi) {
        this.renderer.setElementProperty(this.ironSelector, 'selectedValues', obj);
      } else {
        this.renderer.setElementProperty(this.ironSelector, 'selected', obj);
      }
    } else {
      this.renderer.setElementProperty(this.elementRef.nativeElement, 'value', obj);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setElementProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('input', ['$event'])
  protected onInput(event: Event) {
    if (this.ironCheckedElement) {
      this.onChange((<any>event.target).checked);
    } else {
      this.onChange((<any>event.target).value);
    }
  }

  @HostListener('blur')
  @HostListener('iron-activate')
  protected onBlurOrActive() {
    this.onTouched();
  }

  @HostListener('iron-select')
  protected onIronSelect() {
    if (this.elementRef.nativeElement.multi) {
      this.onChange(this.ironSelector.selectedValues);
    } else {
      this.onChange(this.ironSelector.selected);
    }
  }

  @HostListener('iron-deselect')
  protected onIronDeselect() {
    if (this.ngControl.dirty) {
      this.onIronSelect();
    } else {
      // Control was reset, do not fire a change event which would mark it as dirty
    }
  }
}
