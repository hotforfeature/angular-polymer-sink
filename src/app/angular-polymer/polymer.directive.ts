import { Directive, ElementRef, OnInit } from '@angular/core';

const Polymer: any = (<any>window).Polymer;
const customElements: any = (<any>window).customElements;

@Directive({
  selector: '[polymer]'
})
export class PolymerDirective implements OnInit {
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const htmlElement = Object.getPrototypeOf(this.elementRef.nativeElement);
    if (htmlElement.is) {
      const klass = customElements.get(htmlElement.is);

      // Setup Polymer to Angular event mapping
      let notify = [];
      notify = notify.concat(...this.getNotifyProperties(klass.prototype.properties || {}));
      if (klass.prototype.behaviors) {
        klass.prototype.behaviors.forEach(behavior => {
          notify = notify.concat(...this.getNotifyProperties(behavior.properties || {}));
        });
      }

      notify.forEach(property => {
        const eventName = `${Polymer.CaseMap.camelToDashCase(property)}-changed`;
        this.elementRef.nativeElement.addEventListener(eventName, event => {
          this.elementRef.nativeElement.dispatchEvent(new CustomEvent(`${property}Change`, {
            detail: event.detail
          }));
        });

        // Fire an initial event to set the properties to their correct starting value
        this.elementRef.nativeElement.dispatchEvent(new CustomEvent(`${property}Change`, {
          detail: {
            value: this.elementRef.nativeElement[property]
          }
        }));
      });
    } else {
      console.warn(`<${htmlElement.tagName.toLowerCase()}> is not a registered element`);
    }
  }

  private getNotifyProperties(properties: any): string[] {
    return Object.keys(properties).filter(property => {
      return properties[property].notify;
    });
  }
}
