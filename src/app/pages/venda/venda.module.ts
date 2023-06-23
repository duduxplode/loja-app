import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {VendaRoutingModule} from "./venda-routing.module";
import {HomeVendaComponent} from "./home-venda/home-venda.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";


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
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule
    ]
})
export class VendaModule { }
