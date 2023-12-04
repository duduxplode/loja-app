import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {VendaRoutingModule} from "./venda-routing.module";
import {HomeVendaComponent} from "./home-venda/home-venda.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import { ListVendaComponent } from './list-venda/list-venda.component';
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from "@angular/material/grid-list";
import {CartService} from "../carrinho/carrinho.service";
import {AppModule} from "../../app.module";
import {CarrinhoComponent} from "../carrinho/carrinho.component";


@NgModule({
  declarations: [
    HomeVendaComponent,
    ListVendaComponent,
    CarrinhoComponent
  ],
  providers: [
    CartService
  ],
  exports: [
    HomeVendaComponent,
    CarrinhoComponent
  ],
  imports: [
    CommonModule,
    VendaRoutingModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule
  ]
})
export class VendaModule { }
