import {Component, OnInit, ViewChild} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatSidenav} from "@angular/material/sidenav";
import {MatTableDataSource} from "@angular/material/table";
import {ComputadorDto} from "../../../api/models/computador-dto";
import {ComputadorControllerService} from "../../../api/services/computador-controller.service";
import {VendaControllerService} from "../../../api/services/venda-controller.service";
import {MessageService} from "../../../arquitetura/message/message.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavigationEnd, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {CartService} from "../carrinho/carrinho.service";
import {EventEmitterService} from "../../../service/EventEmitterService";
import {delay, filter} from "rxjs/operators";
import {VendaDto} from "../../../api/models/venda-dto";
import {MessageResponse} from "../../../api/models/message-response";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  public readonly ACAO_VENDER = "Incluir";
  computadorListaDataSource: MatTableDataSource<ComputadorDto> = new MatTableDataSource<ComputadorDto>([]);
  refreshEvento: any = null;

  constructor(
    public computadorService: ComputadorControllerService,
    public vendaService: VendaControllerService,
    private mensageService: MessageService,
    private observer: BreakpointObserver,
    private router: Router,
    public securityService: SecurityService,
    private cartService: CartService
  ){}

  ngOnInit(): void {
    this.buscarDados();
    this.refreshEvento = EventEmitterService.get('refreshComputadores').subscribe(e => this.buscarDados());
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  public buscarDados() {
    this.computadorService.computadorControllerListAll().subscribe(data => {
      console.log(data);
      this.computadorListaDataSource.data = data;
    })
  }

  addCart(computadorDto: ComputadorDto){
    // NProgress.start()
    this.cartService.addItem(computadorDto)
    // NProgress.done()
  }

  showError(erro: MessageResponse, acao: string) {
    this.mensageService.addMsgWarning(`Erro ao ${acao}`);
  }

}

