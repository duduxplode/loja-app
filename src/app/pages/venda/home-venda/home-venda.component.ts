import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ComputadorDto} from "../../../api/models/computador-dto";
import {EventEmitterService} from "../../../service/EventEmitterService";
import {ComputadorControllerService} from "../../../api/services/computador-controller.service";
import {VendaControllerService} from "../../../api/services/venda-controller.service";
import {VendaDto} from "../../../api/models/venda-dto";
import {MessageService} from "../../../arquitetura/message/message.service";
import {MessageResponse} from "../../../api/models/message-response";
import {NavigationEnd, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {delay, filter} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {CartService} from '../../carrinho/carrinho.service';

@UntilDestroy()
@Component({
  selector: 'app-home-venda',
  templateUrl: './home-venda.component.html',
  styleUrls: ['./home-venda.component.scss']
})
export class HomeVendaComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  public readonly ACAO_VENDER = "Incluir";
  computadorListaDataSource: MatTableDataSource<ComputadorDto> = new MatTableDataSource<ComputadorDto>([]);
  refreshEvento: any = null;
  items(){
    return this.cartService.items.length > 0 ? this.cartService.items.length : ""

  }

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

  public vender(computadorDto: ComputadorDto) {
    let venda = {
      cliente: this.securityService.credential.userName,
      fkComputador: computadorDto,
      valorUnitario: computadorDto.valorVenda,
      valorTotal: computadorDto.valorVenda,
      quantidade: 1,
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

  showError(erro: MessageResponse, acao: string) {
    this.mensageService.addMsgWarning(`Erro ao ${acao}`);
  }

  sair() {
    this.securityService.invalidate();
    this.router.navigate(['/acesso']);
  }
}
