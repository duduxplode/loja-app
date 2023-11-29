import { Component, OnInit} from '@angular/core';
import {ComputadorDto} from '../../api/models/computador-dto';
import {CartService} from './carrinho.service'
import { default as swal} from 'sweetalert2'

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  constructor(private cartService: CartService) { }

  ngOnInit() {
    //sessionStorage.removeItem("cart")
    let cartSession = sessionStorage.getItem("cart");
    //carrinho não está vazio
    if(cartSession != null){
      this.cartService.items = JSON.parse(cartSession);
    }
  }

  items(): ComputadorDto[] {
    return this.cartService.items;
  }
  removeItem(item:ComputadorDto){
    let c = this.cartService
    swal.fire({
      title: 'Confirmação',
      text: 'Você tem certeza que deseja remover este item do carrinho?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#449d44',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    }).then(function () {
      return c.removeItem(item)
      swal.fire({
        title: 'Excluído!',
        text: 'Item excluído do carrinho.',
        icon: 'success'
      })
    })


  }

  total() :number{
    return this.cartService.total()
  }
}
