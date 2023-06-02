import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComputadorComponent} from "./home-computador/home-computador.component";
import {FormComputadorComponent} from "./form-computador/form-computador.component";
import {ListaComputadorComponent} from "./lista-computador/lista-computador.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";

export const computadorRoutes: Routes = [
  {
    path: "computador",
    component: HomeComputadorComponent,
    children: [
      {
        path: "",
        component: ListaComputadorComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_ADMIN']}}
      },
      {
        path: "novo",
        component: FormComputadorComponent
      },
      {
        path: ":codigo",
        component: FormComputadorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(computadorRoutes)],
  exports: [RouterModule]
})
export class ComputadorRoutingModule { }
