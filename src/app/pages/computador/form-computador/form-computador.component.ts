import {
  Component,
} from '@angular/core';
import {
  DateAdapter,
} from '@angular/material/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComputadorControllerService} from "../../../api/services/computador-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ComputadorDto} from "../../../api/models/computador-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MessageResponse} from "../../../api/models/message-response";
import * as moment from "moment";

@Component({
  selector: 'app-form-computador',
  templateUrl: './form-computador.component.html',
  styleUrls: ['./form-computador.component.css']
})
export class FormComputadorComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  acao: string = this.ACAO_INCLUIR;
  id!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public computadorService: ComputadorControllerService,
    private dialog: MatDialog,
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (!this.id) {
        this.realizarInclusao();
      } else {
        this.realizarEdicao();
      }
    }
  }

  showError(erro: MessageResponse, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: `Erro ao ${acao}`,
        mensagem: erro.message,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }

  private realizarEdicao() {
    console.log("Dados edicao:", this.formGroup.value);
    this.computadorService.alterar({id: this.id, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigate(["/computador"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.showError(erro.error, this.ACAO_EDITAR);
      })
  }

  private realizarInclusao() {
    console.log("Dados inclusao:", this.formGroup.value);
    this.computadorService.incluir({body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_INCLUIR);
        this.router.navigate(["/computador"]);
      }, erro => {
        console.log("Erro:" + erro);
        this.showError(erro.error, this.ACAO_INCLUIR)
      })
  }

  confirmarAcao(computadorDto: ComputadorDto, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Ação de ${acao} dados: ${computadorDto.descricao} (ID: ${computadorDto.id}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('codigo');
    console.log(paramId);
    if (paramId) {
      const codigo = parseInt(paramId);
      console.log("codigo", paramId);
      this.computadorService.obterPorId({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          if (retorno.id != null) {
            this.id = retorno.id;
          }
          this.formGroup.patchValue(retorno);
          if (retorno.dataLancamento != null) {
            var minhaData = moment(
              retorno.dataLancamento
            );
            this.formGroup.get('dataLancamento')?.setValue(minhaData.toDate());
          }
        }
      )
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      // descricao: ["Dell G7", Validators.required],
      // dataLancamento: [new Date(), Validators.required],
      // tipo: ["Notebook", Validators.required],
      // processador: ["Core i7", Validators.required],
      // tamanhoRam: ["16", Validators.required],
      // unidadeRam: ["GB", Validators.required],
      // tamanhoHd: ["500", Validators.required],
      // unidadeHd: ["GB", Validators.required],
      descricao: [null, Validators.required],
      dataLancamento: [new Date(), Validators.required],
      tipo: [null, Validators.required],
      processador: [null, Validators.required],
      tamanhoRam: [null, Validators.required],
      unidadeRam: [null, Validators.required],
      tamanhoHd: [null, Validators.required],
      unidadeHd: [null, Validators.required],
    });
  }
}
