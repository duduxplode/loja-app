import {Injectable} from '@angular/core'

// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'

import {ComputadorDto} from '../../../api/models/computador-dto'
import {VendaDto} from "../../../api/models/venda-dto";
import {VendaControllerService} from "../../../api/services/venda-controller.service";
import {MessageService} from "../../../arquitetura/message/message.service";
import {SecurityService} from "../../../arquitetura/security/security.service";

// import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class CartService {

  constructor(
    public vendaService: VendaControllerService,
    public securityService: SecurityService,
    private mensageService: MessageService
  ){}

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

  public vender(computadorDto: ComputadorDto) {
    let venda = {
      cliente: this.securityService.credential.userName,
      fkComputador: computadorDto,
      valorUnitario: computadorDto.valorVenda,
      valorTotal: this.total(),
      quantidade: this.items.length,
      dataVenda: new Date().toISOString()
    }
    this.vendaService.vendaControllerIncluir({body: venda})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno);
      }, erro => {
        console.log("Erro:" + erro);
        this.mensageService.addConfirmOk(erro.parameters[0])
      });
  }

  confirmarAcao(vendaDto: VendaDto) {
    this.mensageService.addConfirmOk(`Venda: (ID: ${vendaDto.id}) do ${vendaDto.fkComputador?.descricao} realizada com sucesso!`);
  }
}
