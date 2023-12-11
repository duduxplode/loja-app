import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormTipoComputadorComponent} from "./form-tipo-computador/form-tipo-computador.component";
import {ListTipoComputadorComponent} from "./list-tipo-computador/list-tipo-computador.component";
import {TipoComputadorRoutingModule} from "./tipo_computador-routing.module";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import { HomeTipoComputadorComponent } from './home-tipo-computador/home-tipo-computador.component';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SearchModule} from "../../arquitetura/search-module/search.module";
import {FlexModule} from "@angular/flex-layout";



@NgModule({
  declarations: [
    FormTipoComputadorComponent,
    ListTipoComputadorComponent,
    HomeTipoComputadorComponent
  ],
  exports: [
    FormTipoComputadorComponent
  ],
  imports: [
    CommonModule,
    TipoComputadorRoutingModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SearchModule,
    FlexModule
  ]
})
export class TipoComputadorModule { }
