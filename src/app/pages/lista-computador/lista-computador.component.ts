import {Component, OnInit} from '@angular/core';
import {ComputadorDto} from "../../api/models/computador-dto";
import {ComputadorControllerService} from "../../api/services/computador-controller.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-lista-computador',
  templateUrl: './lista-computador.component.html',
  styleUrls: ['./lista-computador.component.css']
})
export class ListaComputadorComponent implements OnInit{
  colunasMostrar = ['id', 'descricao', 'tipo'];
  computadorListaDataSource: MatTableDataSource<ComputadorDto> = new MatTableDataSource<ComputadorDto>([]);

  constructor(
    public computadorService: ComputadorControllerService,
    // private dialog: MatDialog,
    // private snackBar: MatSnackBar
  ) {
  }

  public titulo = "Listagem de computadores";

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.computadorService.listAll().subscribe(data => {
      console.log(data);
      this.computadorListaDataSource.data = data;
    })
  }

}
