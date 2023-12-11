import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeLojaComponent} from "./home-loja/home-loja.component";
import {CarrinhoComponent} from "./carrinho/carrinho.component";
import {CartService} from "./carrinho/carrinho.service";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {RouterOutlet} from "@angular/router";
import {LojaRoutingModule} from "./loja-routing.module";
import {ListaComponent} from "./lista/lista.component";



@NgModule({
  declarations: [
    HomeLojaComponent,
    CarrinhoComponent,
    ListaComponent
  ],
  providers: [
    CartService
  ],
  imports: [
    CommonModule,
    LojaRoutingModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    RouterOutlet
  ],
  exports: [
    HomeLojaComponent,
    CarrinhoComponent
  ]

})
export class LojaModule { }
