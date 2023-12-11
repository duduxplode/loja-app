import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecurityGuard} from "../../arquitetura/security/security.guard";
import {ListTipoComputadorComponent} from "./list-tipo-computador/list-tipo-computador.component";
import {FormTipoComputadorComponent} from "./form-tipo-computador/form-tipo-computador.component";
import {TipoComputadorModule} from "./tipo-computador.module";
import {HomeTipoComputadorComponent} from "./home-tipo-computador/home-tipo-computador.component";

export const tipoComputadorRoutes: Routes = [
  {
    path: "tipo_computador",
    component: HomeTipoComputadorComponent,
    children: [
      {
        path: "",
        component: ListTipoComputadorComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_ADMIN']}}
      },
      {
        path: "novo",
        component: FormTipoComputadorComponent
      },
      {
        path: ":codigo",
        component: FormTipoComputadorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(tipoComputadorRoutes)],
  exports: [RouterModule]
})
export class TipoComputadorRoutingModule { }
