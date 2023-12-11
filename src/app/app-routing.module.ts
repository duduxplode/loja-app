import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {computadorRoutes} from "./pages/computador/computador-routing.module";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";
import {vendaRoutes} from "./pages/venda/venda-routing.module";
import {HomeLojaComponent} from "./pages/loja/home-loja/home-loja.component";
import {tipoComputadorRoutes} from "./pages/tipo-computador/tipo_computador-routing.module";
import {lojaRoutes} from "./pages/loja/loja-routing.module";

const routes: Routes = [
  {
    path : "",
    component : HomeLojaComponent,
    children : [...lojaRoutes]
  },
  {
    path : "adm",
    component : HomeComponent,
    children: [...computadorRoutes, ...tipoComputadorRoutes, ...vendaRoutes]
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
