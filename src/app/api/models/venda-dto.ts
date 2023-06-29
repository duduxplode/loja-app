/* tslint:disable */
/* eslint-disable */
import { ComputadorDto } from './computador-dto';
export interface VendaDto {
  cliente?: string;
  dataVenda?: string;
  fkComputador?: ComputadorDto;
  id?: number;
  quantidade?: number;
  valorTotal?: number;
  valorUnitario?: number;
}
