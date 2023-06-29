/* tslint:disable */
/* eslint-disable */
import { VendaDto } from './venda-dto';
export interface ComputadorDto {
  contVendas?: number;
  dataLancamento?: string;
  descricao?: string;
  id?: number;
  imagem?: string;
  imagemBase64?: string;
  listVendaDto?: Array<VendaDto>;
  processador?: string;
  quantidade?: number;
  tamanhoHd?: number;
  tamanhoRam?: number;
  tipo?: string;
  unidadeHd?: string;
  unidadeRam?: string;
  valorCompra?: number;
  valorVenda?: number;
}
