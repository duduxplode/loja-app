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
import {MatDialog} from "@angular/material/dialog";
import {MessageResponse} from "../../../api/models/message-response";
import * as moment from "moment";
import {MessageService} from "../../../arquitetura/message/message.service";
import {FileUploadService} from "../../../service/file-upload.service";
import {FileUploadControllerService} from "../../../api/services/file-upload-controller.service";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TipoComputadorDto} from "../../../api/models/tipo-computador-dto";
import {TipoComputadorControllerService} from "../../../api/services/tipo-computador-controller.service";

@Component({
  selector: 'app-form-computador',
  templateUrl: './form-computador.component.html',
  styleUrls: ['./form-computador.component.scss']
})
export class FormComputadorComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  acao: string = this.ACAO_INCLUIR;
  id!: number;

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file

  tipos: TipoComputadorDto[] = [];
  retorno!: object;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public computadorService: ComputadorControllerService,
    private dialog: MatDialog,
    private mensageService: MessageService,
    private fileUploadService: FileUploadControllerService,
    private securityService: SecurityService,
    private tipoComputadorService: TipoComputadorControllerService
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

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload(id: string) {
    this.loading = !this.loading;
    this.fileUploadService.fileUploadControllerHandleFileRenameUpload({filename: id,body: {file: this.file}})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
      }, erro => {
        console.log("Erro:", erro.error);
      });
    return false;
  }

  showError(erro: MessageResponse, acao: string) {
    this.mensageService.addMsgWarning(`Erro ao ${acao}`);
  }

  private realizarEdicao() {
    console.log("Dados edicao:", this.formGroup.value);
    this.computadorService.computadorControllerAlterar({id: this.id, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigate(["/adm/computador"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.showError(erro.error, this.ACAO_EDITAR);
      })
  }

  private realizarInclusao() {
    console.log("Dados inclusao:", this.formGroup.value);
    this.computadorService.computadorControllerIncluir({body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.onUpload(retorno.id);
        this.confirmarAcao(retorno, this.ACAO_INCLUIR);
        this.router.navigate(["/adm/computador"]);
      }, erro => {
        console.log("Erro:" + erro);
        this.showError(erro.error, this.ACAO_INCLUIR)
      })
  }

  confirmarAcao(computadorDto: ComputadorDto, acao: string) {
    this.mensageService.addConfirmOk(`Ação de ${acao} dados: ${computadorDto.descricao} (ID: ${computadorDto.id}) realizada com sucesso!`);
  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('codigo');
    console.log(paramId);
    if (paramId) {
      const codigo = parseInt(paramId);
      console.log("codigo", paramId);
      this.computadorService.computadorControllerObterPorId({id: codigo}).subscribe(
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
      descricao: ["Dell G7", Validators.required],
      dataLancamento: [new Date(), Validators.required],
      tipo_id: [null, Validators.required],
      processador: ["Core i7", Validators.required],
      tamanhoRam: ["16", Validators.required],
      unidadeRam: ["GB", Validators.required],
      tamanhoHd: ["500", Validators.required],
      unidadeHd: ["GB", Validators.required],
      valorCompra: [3500, Validators.required],
      valorVenda: [4500, Validators.required],
      quantidade: [2, Validators.required],
      imagem: [null, null],
    });
  }

  private carregarDados() {
    //this.tipos = this.route.snapshot.data['tipos'];
    this.tipoComputadorService.tipoComputadorControllerListAll().subscribe(value => {
      this.tipos = value;
    })
  }

}
