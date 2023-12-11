import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ComputadorDto} from "../../../api/models/computador-dto";
import {TipoComputadorDto} from "../../../api/models/tipo-computador-dto";
import {ComputadorControllerService} from "../../../api/services/computador-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageService} from "../../../arquitetura/message/message.service";
import {TipoComputadorControllerService} from "../../../api/services/tipo-computador-controller.service";
import {EventEmitterService} from "../../../service/EventEmitterService";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-list-tipo-computador',
  templateUrl: './list-tipo-computador.component.html',
  styleUrls: ['./list-tipo-computador.component.css']
})
export class ListTipoComputadorComponent implements OnInit{
  colunasMostrar = ['id', 'nome'];
  public dataSource: MatTableDataSource<TipoComputadorDto> = new MatTableDataSource<TipoComputadorDto>([]);
  tipoComputadorListaDataSource: MatTableDataSource<TipoComputadorDto> = new MatTableDataSource<TipoComputadorDto>([]);
  refreshEvento: any = null;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    public tipoComputadorService: TipoComputadorControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
    this.refreshEvento = EventEmitterService.get('refreshTipoComputadores').subscribe(e => this.buscarDados());
  }

  public buscarDados() {
    this.tipoComputadorService.tipoComputadorControllerListAll().subscribe(data => {
      console.log(data);
      this.tipoComputadorListaDataSource.data = data;
    })
  }

  remover(tipoComputadorDto: TipoComputadorDto) {
    console.log("Removido", tipoComputadorDto.id);
    this.tipoComputadorService.tipoComputadorControllerRemover({id: tipoComputadorDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          console.log("Exlcusão:", retorno);
        }, error => {
          if (error.status === 404) {
            this.showMensagemSimples("Tipo de computador não existe mais", 5000)
          } else {
            this.messageService.addConfirmOk("Erro ao excluir: "+error.message);
            console.log("Erro:", error);
          }
        }
      )
  }

  confirmarExcluir(tipoComputadorDto: TipoComputadorDto) {
    this.messageService.addConfirmYesNo(`A exclusão de: ${tipoComputadorDto.nome} (ID: ${tipoComputadorDto.id})?`,()=>{
      this.remover(tipoComputadorDto);
    });
  }

  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.messageService.addMsgInf(mensagem);
  }

  showResult($event: any[]) {
    console.log($event);
    this.tipoComputadorListaDataSource.data = $event;
  }
}
