import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OnPolymerChange } from '../angular-polymer';

@Component({
  selector: 'app-paper-reactive-form',
  templateUrl: 'reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent implements OnInit, OnPolymerChange {
  form: FormGroup;
  formModel: string;
  polyForm: FormGroup;
  polyFormModel: string;

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

  constructor(private changeRef: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      alterEgo: ['', Validators.minLength(5)],
      power: [null, Validators.required]
    });

    this.polyForm = this.fb.group({
      name: ['', Validators.required],
      alterEgo: ['', Validators.minLength(5)],
      power: [null, Validators.required]
    });
  }

  onSubmit() {
    this.formModel = JSON.stringify(this.form.getRawValue(), undefined, 2);
    this.polyFormModel = JSON.stringify(this.polyForm.getRawValue(), undefined, 2);
  }

  newHero() {
    this.form.reset();
    this.polyForm.reset();
  }

  onPolymerChange() {
    this.changeRef.detectChanges();
  }
}
