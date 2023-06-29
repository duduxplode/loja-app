import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeVendaComponent} from "./home-venda/home-venda.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";
import {ListVendaComponent} from "./list-venda/list-venda.component";

export const vendaRoutes: Routes = [
  {
    path: "venda",
    component: ListVendaComponent,
    canActivate: [SecurityGuard],
    data: {security: {roles: ['ROLE_ADMIN']}}
    // children: [
    //   {
    //     path: "",
    //     component: ListVendaComponent,
    //     canActivate: [SecurityGuard],
    //     data: {security: {roles: ['ROLE_ADMIN']}}
    //   }
      // {
      //   path: "novo",
      //   component: FormComputadorComponent
      // },
      // {
      //   path: ":codigo",
      //   component: FormComputadorComponent
      // }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(vendaRoutes)],
  exports: [RouterModule]
})
export class VendaRoutingModule { }
