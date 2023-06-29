import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EventEmitterService} from "../../../service/EventEmitterService";
import {VendaControllerService} from "../../../api/services/venda-controller.service";
import {VendaDto} from "../../../api/models/venda-dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-venda',
  templateUrl: './list-venda.component.html',
  styleUrls: ['./list-venda.component.css']
})
export class ListVendaComponent implements OnInit{
  colunasMostrar = ['id', 'data', 'computador' , 'valor_unitario', 'quantidade', 'valor_total'];
  vendaListaDataSource: MatTableDataSource<VendaDto> = new MatTableDataSource<VendaDto>([]);
  refreshEvento: any = null;

  constructor(
    public vendaService: VendaControllerService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {this.buscarDados();
    this.refreshEvento = EventEmitterService.get('refreshVendas').subscribe(e => this.buscarDados());
  }

  public buscarDados() {
    this.vendaService.listAll().subscribe(data => {
      console.log(data);
      this.vendaListaDataSource.data = data;
    })
  }


}
