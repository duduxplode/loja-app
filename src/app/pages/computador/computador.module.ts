import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputadorRoutingModule } from './computador-routing.module';
import {HomeComputadorComponent} from "./home-computador/home-computador.component";
import {FormComputadorComponent} from "./form-computador/form-computador.component";
import {ListaComputadorComponent} from "./lista-computador/lista-computador.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    HomeComputadorComponent,
    FormComputadorComponent,
    ListaComputadorComponent
  ],
  exports: [
    HomeComputadorComponent
  ],
  imports: [
    CommonModule,
    ComputadorRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ]
})
export class ComputadorModule { }
