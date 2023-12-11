/* tslint:disable */
/* eslint-disable */
import { ComputadorDto } from './computador-dto';
import { VendaDto } from './venda-dto';
export interface ItemVendaDto {
  computador_id?: number;
  fkComputadorDTO?: ComputadorDto;
  fkVendaDTO?: VendaDto;
  id?: number;
  quantidade?: number;
  valorTotal?: number;
  valorUnitario?: number;
  venda_id?: number;
}
