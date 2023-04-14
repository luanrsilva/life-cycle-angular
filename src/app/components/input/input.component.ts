import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { log } from 'console';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges {

  @Input() itemToEdit!: Item;
  editando = false;
  txtBtn = 'Salvar item';
  valorItem!: string;

  constructor(private listaService: ListaDeCompraService) {}

  ngOnInit(): void {}

  adicionarItem() {
    this.listaService.adicionarItemNaLista(this.valorItem);
    this.limparCampo();
  }

  limparCampo(){
    this.valorItem = '';
  }

  editItem() {
    this.listaService.editItem(this.itemToEdit, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.txtBtn = 'Salvar item'
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['itemToEdit'].firstChange) {
      this.editando = true;
      this.txtBtn = 'Editar item';
      this.valorItem = this.itemToEdit?.nome;
    }
  }
}
