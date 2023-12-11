import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EventEmitterService} from "../../../service/EventEmitterService";
import {VendaControllerService} from "../../../api/services/venda-controller.service";
import {VendaDto} from "../../../api/models/venda-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PeriodicElement} from "../PeriodicElement";

@Component({
  selector: 'app-list-venda',
  templateUrl: './list-venda.component.html',
  styleUrls: ['./list-venda.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ListVendaComponent implements OnInit{
  colunasMostrar = ['id', 'cliente' , 'data', 'quantidade', 'valor_total'];
  colunasMostrarWithExpand = [...this.colunasMostrar, 'expand'];
  expandedElement: PeriodicElement = new class implements PeriodicElement {
    cliente!: string;
    data!: string;
    id!: number;
    item!: string;
    quantidade!: number;
    valor_total!: number;
  };
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
    this.vendaService.vendaControllerListAll().subscribe(data => {
      console.log(data);
      this.vendaListaDataSource.data = data;
    })
  }


}
