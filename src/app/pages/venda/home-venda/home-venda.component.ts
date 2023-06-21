import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ComputadorDto} from "../../../api/models/computador-dto";
import {EventEmitterService} from "../../../service/EventEmitterService";
import {ComputadorControllerService} from "../../../api/services/computador-controller.service";
import {VendaControllerService} from "../../../api/services/venda-controller.service";
import {VendaDto} from "../../../api/models/venda-dto";
import {MessageService} from "../../../arquitetura/message/message.service";
import {MessageResponse} from "../../../api/models/message-response";

@Component({
  selector: 'app-home-venda',
  templateUrl: './home-venda.component.html',
  styleUrls: ['./home-venda.component.css']
})
export class HomeVendaComponent implements OnInit{
  public readonly ACAO_VENDER = "Incluir";
  computadorListaDataSource: MatTableDataSource<ComputadorDto> = new MatTableDataSource<ComputadorDto>([]);
  refreshEvento: any = null;

  constructor(
    public computadorService: ComputadorControllerService,
    public vendaService: VendaControllerService,
    private mensageService: MessageService
  ){}

  ngOnInit(): void {
    this.buscarDados();
    this.refreshEvento = EventEmitterService.get('refreshComputadores').subscribe(e => this.buscarDados());
  }

  public buscarDados() {
    this.computadorService.listAll1().subscribe(data => {
      console.log(data);
      this.computadorListaDataSource.data = data;
    })
  }

  public vender(computadorDto: ComputadorDto) {
    let venda = {
      fkComputador: computadorDto,
      valorUnitario: computadorDto.valorVenda,
      valorTotal: computadorDto.valorVenda,
      quantidade: 1,
      dataVenda: new Date().toISOString()
    }
    this.vendaService.incluir({body: venda})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno);
      }, erro => {
        console.log("Erro:" + erro);
        this.showError(erro.error, this.ACAO_VENDER)
      });
  }

  confirmarAcao(vendaDto: VendaDto) {
    this.mensageService.addConfirmOk(`Venda: (ID: ${vendaDto.id}) do ${vendaDto.fkComputador?.descricao} realizada com sucesso!`);
  }

  showError(erro: MessageResponse, acao: string) {
    this.mensageService.addMsgWarning(`Erro ao ${acao}`);
  }
}
