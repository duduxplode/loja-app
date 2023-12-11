import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeLojaComponent} from "../loja/home-loja/home-loja.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";
import {ListVendaComponent} from "./list-venda/list-venda.component";
import {CarrinhoComponent} from "../loja/carrinho/carrinho.component";

export const vendaRoutes: Routes = [
  {
    path: "venda",

    children: [
      {
        path: "",
        component: ListVendaComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_ADMIN']}}
      },
      {
        path: "carrinho",
        component: CarrinhoComponent
      }
      // {
      //   path: ":codigo",
      //   component: FormComputadorComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(vendaRoutes)],
  exports: [RouterModule]
})
export class VendaRoutingModule { }
