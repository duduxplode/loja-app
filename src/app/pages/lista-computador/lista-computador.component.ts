import {Component, OnInit} from '@angular/core';
import {ComputadorDto} from "../../api/models/computador-dto";
import {ComputadorControllerService} from "../../api/services/computador-controller.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../core/confirmation-dialog/confirmation-dialog.component";
import {EventEmitterService} from "../../api/services/EventEmitterService";

@Component({
  selector: 'app-lista-computador',
  templateUrl: './lista-computador.component.html',
  styleUrls: ['./lista-computador.component.css']
})
export class ListaComputadorComponent implements OnInit{
  colunasMostrar = ['id', 'descricao', 'tipo', 'acao'];
  computadorListaDataSource: MatTableDataSource<ComputadorDto> = new MatTableDataSource<ComputadorDto>([]);
  refreshEvento: any = null;


  constructor(
    public computadorService: ComputadorControllerService,
    private dialog: MatDialog,
    // private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
    this.refreshEvento = EventEmitterService.get('refreshComputadores').subscribe(e => this.buscarDados());
  }

  public buscarDados() {
    this.computadorService.listAll().subscribe(data => {
      console.log(data);
      this.computadorListaDataSource.data = data;
    })
  }

  remover(computadorDto: ComputadorDto) {
    console.log("Removido", computadorDto.id);
    this.computadorService.remover({id: computadorDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          // this.showMensagemSimples("Excluído com sucesso ",5000);
          console.log("Exlcusão:", retorno);
        }, error => {
          if (error.status === 404) {
            // this.showMensagemSimples("Tipo não existe mais")
          } else {
            // this.showMensagemSimples("Erro ao excluir");
            console.log("Erro:", error);
          }
        }
      )
  }

  confirmarExcluir(computadorDto: ComputadorDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${computadorDto.descricao} (ID: ${computadorDto.id})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: computadorDto
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.remover(confirmed.dado);
      }
    });
  }

}
