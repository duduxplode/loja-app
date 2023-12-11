import {Injectable} from '@angular/core'

// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'

import {ComputadorDto} from '../../../api/models/computador-dto'
import {VendaDto} from "../../../api/models/venda-dto";
import {VendaControllerService} from "../../../api/services/venda-controller.service";
import {MessageService} from "../../../arquitetura/message/message.service";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {ItemVendaDto} from "../../../api/models/item-venda-dto";
import {default as swal} from "sweetalert2";
import {ItemVendaControllerService} from "../../../api/services/item-venda-controller.service";

// import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class CartService {

  constructor(
    public vendaService: VendaControllerService,
    public itemVendaService: ItemVendaControllerService,
    public securityService: SecurityService,
    private mensageService: MessageService
  ){}

  items: ItemVendaDto[] = [];
  item: ItemVendaDto = new class implements ItemVendaDto {};

  addItem(computador:ComputadorDto){
    var continua = true;
    for (var itemVendaDTO of this.items) {
      if (computador.id == itemVendaDTO.fkComputadorDTO?.id){
        if (itemVendaDTO.quantidade != null) {
          itemVendaDTO.quantidade++;
          if (itemVendaDTO.valorUnitario != null) {
            itemVendaDTO.valorTotal = itemVendaDTO.valorUnitario * itemVendaDTO.quantidade;
          }
        }
        continua = false;
        break;
      }
    }
    if (continua) {
      this.item.fkComputadorDTO = computador;
      this.item.computador_id = computador.id;
      this.item.quantidade = 1;
      this.item.valorUnitario = computador.valorVenda;
      this.item.valorTotal = computador.valorVenda;
      this.items.push(this.item)
    }
    sessionStorage.setItem("cart", JSON.stringify(this.items))
  }

  removeItem(item:ItemVendaDto){
    this.items.splice(this.items.indexOf(item), 1)
    //salva na sessão
    sessionStorage.setItem("cart",JSON.stringify(this.items))
  }

  total() :number{
    return <number>this.items
      .map(item => item.valorTotal)
      .reduce((prev, value) => <number> prev + <number> value, 0)
  }

  quantidadeTotal() :number{
    var total = 0;
    for (var itemVendaDTO of this.items) {
      if (itemVendaDTO.quantidade != null) {
        total += itemVendaDTO.quantidade;
      }
    }
    return total;
  }

  private salvarItems(venda: VendaDto) :boolean{
    var ok = false;
    for (var itemVendaDTO of this.items) {
      itemVendaDTO.fkVendaDTO = venda;
      itemVendaDTO.venda_id = venda.id;
      this.itemVendaService.itemVendaControllerIncluir({body: itemVendaDTO})
        .subscribe(retorno => {
          console.log("Retorno:", retorno);
          ok = true;
        }, erro => {
          console.log("Erro:" + erro);
          this.mensageService.addConfirmOk(erro.parameters[0])
        });
    }
    return ok;
  }

  public vender() {
    let venda = {
      cliente: this.securityService.credential.userName,
      valorTotal: this.total(),
      quantidade: this.quantidadeTotal(),
      dataVenda: new Date().toISOString()
    }
    this.vendaService.vendaControllerIncluir({body: venda})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.salvarItems(retorno)
        this.items = [];
        sessionStorage.clear();
        this.confirmarAcao(retorno);
      }, erro => {
        console.log("Erro:" + erro);
        this.mensageService.addConfirmOk(erro.parameters[0])
      });
  }

  confirmarAcao(vendaDto: VendaDto) {
    this.mensageService.addConfirmOk(`Venda: (ID: ${vendaDto.id}) realizada com sucesso!`);
  }
}
