import {Injectable} from '@angular/core'

// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'

import {ComputadorDto} from '../../api/models/computador-dto'

// import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class CartService {

  constructor(){}

  items: ComputadorDto[] = []

  addItem(item:ComputadorDto){
    this.items.push(item)
    sessionStorage.setItem("cart",JSON.stringify(this.items))
  }

  removeItem(item:ComputadorDto){
    this.items.splice(this.items.indexOf(item), 1)
    //salva na sessão
    sessionStorage.setItem("cart",JSON.stringify(this.items))
  }

  total() :number{
    return <number>this.items
      .map(item => item.valorVenda)
      .reduce((prev, value) => <number> prev + <number> value, 0)
  }
}
