import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {computadorRoutes} from "./pages/computador/computador-routing.module";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";

const routes: Routes = [
  {
    path : "",
    component : HomeComponent,
    children: [...computadorRoutes]
  },
  {
    path: "acesso",
    children: [
      ...AutenticacaoRoutes
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
