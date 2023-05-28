import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComputadorControllerService} from "../../api/services/computador-controller.service";
import {EventEmitterService} from "../../api/services/EventEmitterService";

@Component({
  selector: 'app-form-computador',
  templateUrl: './form-computador.component.html',
  styleUrls: ['./form-computador.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComputadorComponent {
  exampleHeader = ExampleHeader;
  formGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public computadorService: ComputadorControllerService,
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log("Dados:",this.formGroup.value);
      this.computadorService.incluir({body: this.formGroup.value})
        .subscribe( retorno =>{
          EventEmitterService.get('refreshComputadores').emit(true);
          console.log("Retorno:",retorno);
          // this.confirmarInclusao(retorno);
        }, erro =>{
          console.log("Erro:"+erro);
          alert("Erro ao incluir!");
        })
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      descricao: ["Dell G7", Validators.required],
      dataLancamento: [new Date(), Validators.required],
      tipo: ["Notebook", Validators.required],
      processador: ["Core i7", Validators.required],
      tamanhoRam: ["16", Validators.required],
      unidadeRam: ["GB", Validators.required],
      tamanhoHd: ["500", Validators.required],
      unidadeHd: ["GB", Validators.required],
    });
  }
}

@Component({
  selector: 'example-header',
  styles: [
    `
    .example-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
    }

    .example-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
    }
  `,
  ],
  template: `
    <div class="example-header">
      <button mat-icon-button (click)="previousClicked('year')">
        <mat-icon>keyboard_double_arrow_left</mat-icon>
      </button>
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{periodLabel}}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button mat-icon-button (click)="nextClicked('year')">
        <mat-icon>keyboard_double_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class ExampleHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
