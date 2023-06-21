/* tslint:disable */
/* eslint-disable */
import { ComputadorDto } from './computador-dto';
export interface VendaDto {
  dataVenda?: string;
  fkComputador?: ComputadorDto;
  id?: number;
  quantidade?: number;
  valorTotal?: number;
  valorUnitario?: number;
}
