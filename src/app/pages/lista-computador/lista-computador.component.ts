import {Component, OnInit} from '@angular/core';
import {ComputadorDto} from "../../api/models/computador-dto";

@Component({
  selector: 'app-lista-computador',
  templateUrl: './lista-computador.component.html',
  styleUrls: ['./lista-computador.component.css']
})
export class ListaComputadorComponent implements OnInit{
  public titulo = "Listagem de computadores";
  computadoresDto : ComputadorDto[] = [
    {id: 10, descricao: 'Teste'}
  ];
  ngOnInit(): void {

  }

}
