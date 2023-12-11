import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {VendaRoutingModule} from "./venda-routing.module";
import {HomeLojaComponent} from "../loja/home-loja/home-loja.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import { ListVendaComponent } from './list-venda/list-venda.component';
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from "@angular/material/grid-list";
import {CartService} from "../loja/carrinho/carrinho.service";
import {AppModule} from "../../app.module";
import {CarrinhoComponent} from "../loja/carrinho/carrinho.component";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ListVendaComponent
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
    MatGridListModule,
    MatCardModule
  ]
})
export class VendaModule { }
