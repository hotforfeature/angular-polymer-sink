import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { OnPolymerChange } from '../angular-polymer';

@Component({
  selector: 'app-paper-template-form',
  templateUrl: 'template-form.component.html',
  styleUrls: ['./template-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormComponent implements OnInit, OnPolymerChange {
  @ViewChild('ngForm') ngForm: NgForm;
  @ViewChild('polyForm') polyForm: NgForm;

  powers = [
    {
      id: 1,
      name: 'Really Smart'
    },
    {
      id: 2,
      name: 'Super Flexible'
    },
    {
      id: 3,
      name: 'Super Hot'
    },
    {
      id: 4,
      name: 'Weather Changer'
    }
  ];

  model: any;

  get modelJson(): string {
    return JSON.stringify(this.model, undefined, 2);
  }

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.newHero();
  }

  onSubmit() {
    console.log('Submit');
  }

  newHero() {
    this.model = {
      name: null,
      alterEgo:  null,
      power: null
    };

    this.ngForm.reset();
    this.polyForm.reset();
  }

  onPolymerChange() {
    this.changeRef.detectChanges();
  }
}
