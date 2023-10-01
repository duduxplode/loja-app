import {Component, OnInit} from '@angular/core';
import {ComputadorDto} from "../../../api/models/computador-dto";
import {ComputadorControllerService} from "../../../api/services/computador-controller.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventEmitterService} from "../../../service/EventEmitterService";
import {MessageService} from "../../../arquitetura/message/message.service";

@Component({
  selector: 'app-lista-computador',
  templateUrl: './lista-computador.component.html',
  styleUrls: ['./lista-computador.component.css']
})
export class ListaComputadorComponent implements OnInit{
  colunasMostrar = ['id', 'descricao', 'tipo', 'quantidade', 'vendas' , 'acao'];
  computadorListaDataSource: MatTableDataSource<ComputadorDto> = new MatTableDataSource<ComputadorDto>([]);
  refreshEvento: any = null;


  constructor(
    public computadorService: ComputadorControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
    this.refreshEvento = EventEmitterService.get('refreshComputadores').subscribe(e => this.buscarDados());
  }

  public buscarDados() {
    this.computadorService.computadorControllerListAll().subscribe(data => {
      console.log(data);
      this.computadorListaDataSource.data = data;
    })
  }

  remover(computadorDto: ComputadorDto) {
    console.log("Removido", computadorDto.id);
    this.computadorService.computadorControllerRemover({id: computadorDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          console.log("Exlcusão:", retorno);
        }, error => {
          if (error.status === 404) {
            this.showMensagemSimples("Computador não existe mais", 5000)
          } else {
            this.messageService.addConfirmOk("Erro ao excluir: "+error.message);
            console.log("Erro:", error);
          }
        }
      )
  }

  confirmarExcluir(computadorDto: ComputadorDto) {
    this.messageService.addConfirmYesNo(`A exclusão de: ${computadorDto.descricao} (ID: ${computadorDto.id})?`,()=>{
      this.remover(computadorDto);
    });
  }

  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.messageService.addMsgInf(mensagem);
  }

}
