import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {ComputadorControllerService} from "../../../api/services/computador-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MessageService} from "../../../arquitetura/message/message.service";
import {FileUploadControllerService} from "../../../api/services/file-upload-controller.service";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TipoComputadorControllerService} from "../../../api/services/tipo-computador-controller.service";
import {MessageResponse} from "../../../api/models/message-response";
import {ComputadorDto} from "../../../api/models/computador-dto";
import * as moment from "moment/moment";
import {TipoComputadorDto} from "../../../api/models/tipo-computador-dto";

@Component({
  selector: 'app-form-tipo-computador',
  templateUrl: './form-tipo-computador.component.html',
  styleUrls: ['./form-tipo-computador.component.css']
})
export class FormTipoComputadorComponent {
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
    public tipoComputadorService: TipoComputadorControllerService,
    private dialog: MatDialog,
    private mensageService: MessageService,
    private securityService: SecurityService
  ) {
    this.carregarDados();
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
    this.mensageService.addMsgWarning(`Erro ao ${acao}`);
  }

  private realizarEdicao() {
    console.log("Dados edicao:", this.formGroup.value);
    this.tipoComputadorService.tipoComputadorControllerAlterar({id: this.id, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigate(["/adm/tipo_computador"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.showError(erro.error, this.ACAO_EDITAR);
      })
  }

  private realizarInclusao() {
    console.log("Dados inclusao:", this.formGroup.value);
    this.tipoComputadorService.tipoComputadorControllerIncluir({body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_INCLUIR);
        this.router.navigate(["/adm/tipo_computador"]);
      }, erro => {
        console.log("Erro:" + erro);
        this.showError(erro.error, this.ACAO_INCLUIR)
      })
  }

  confirmarAcao(tipoComputadorDto: TipoComputadorDto, acao: string) {
    this.mensageService.addConfirmOk(`Ação de ${acao} dados: ${tipoComputadorDto.nome} (ID: ${tipoComputadorDto.id}) realizada com sucesso!`);
  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('codigo');
    console.log(paramId);
    if (paramId) {
      const codigo = parseInt(paramId);
      console.log("codigo", paramId);
      this.tipoComputadorService.tipoComputadorControllerObterPorId({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          if (retorno.id != null) {
            this.id = retorno.id;
          }
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      nome: ["Notebook", Validators.required],
    });
  }

  private carregarDados() {

  }

}
