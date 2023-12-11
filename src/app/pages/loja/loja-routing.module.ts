import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeLojaComponent} from "./home-loja/home-loja.component";
import {CarrinhoComponent} from "../loja/carrinho/carrinho.component";
import {ListaComponent} from "./lista/lista.component";

export const lojaRoutes: Routes = [
  {
    path: "",

    children: [
      {
        path: "",
        component: ListaComponent
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
  imports: [RouterModule.forChild(lojaRoutes)],
  exports: [RouterModule]
})
export class LojaRoutingModule { }
