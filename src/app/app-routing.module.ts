import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {computadorRoutes} from "./pages/computador/computador-routing.module";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";
import {vendaRoutes} from "./pages/venda/venda-routing.module";
import {HomeVendaComponent} from "./pages/venda/home-venda/home-venda.component";
import {tipoComputadorRoutes} from "./pages/tipo-computador/tipo_computador-routing.module";

const routes: Routes = [
  {
    path : "",
    component : HomeVendaComponent
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
