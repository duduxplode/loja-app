import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {VendaRoutingModule} from "./venda-routing.module";
import {HomeVendaComponent} from "./home-venda/home-venda.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    HomeVendaComponent
  ],
  exports: [
    HomeVendaComponent
  ],
  imports: [
    CommonModule,
    VendaRoutingModule,
    MatListModule,
    MatIconModule
  ]
})
export class VendaModule { }
