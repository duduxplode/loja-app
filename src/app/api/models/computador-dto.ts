/* tslint:disable */
/* eslint-disable */
import { ItemVendaDto } from './item-venda-dto';
export interface ComputadorDto {
  contVendas?: number;
  dataLancamento?: string;
  descricao?: string;
  id?: number;
  imagem?: string;
  imagemBase64?: string;
  listItemVendaDTO?: Array<ItemVendaDto>;
  processador?: string;
  quantidade?: number;
  tamanhoHd?: number;
  tamanhoRam?: number;
  tipo_id?: number;
  tipo_nome?: string;
  unidadeHd?: string;
  unidadeRam?: string;
  valorCompra?: number;
  valorVenda?: number;
}
