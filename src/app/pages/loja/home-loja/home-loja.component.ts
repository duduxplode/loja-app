import {Component} from '@angular/core';
import {CartService} from "../carrinho/carrinho.service";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-loja',
  templateUrl: './home-loja.component.html',
  styleUrls: ['./home-loja.component.scss']
})
export class HomeLojaComponent {
  items(){
    return this.cartService.items.length > 0 ? this.cartService.items.length : ""

  }
  constructor(
    public securityService: SecurityService,
    private cartService: CartService,
    private router: Router
  ) {
  }

  sair() {
    this.securityService.invalidate();
    this.router.navigate(['/acesso']);
  }
}
