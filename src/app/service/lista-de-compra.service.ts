import { Item } from 'src/app/interfaces/iItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaDeCompraService {

  private listaDeCompra: Item[];

  constructor() {
    this.listaDeCompra = JSON.parse(localStorage.getItem('items') || '[]');
  }

  getListaDeCompra(){
    return this.listaDeCompra;
  }

  criarItem(nomeDoItem: string){
    const id = this.listaDeCompra.length + 1
    const item : Item = {
      id: id,
      nome: nomeDoItem,
      data: new Date().toLocaleString('pt-BR'),
      comprado: false
    }
    return item;
  }

  adicionarItemNaLista(nomeDoItem: string){
    const item = this.criarItem(nomeDoItem)
    this.listaDeCompra.push(item);
    // this.atualizaLocalStorage();
  }

  editItem(oldItem: Item, nomeEditado: string) {
    const itemEditado: Item = {
      id: oldItem.id,
      nome: nomeEditado,
      data: oldItem.data,
      comprado: oldItem.comprado
    }

    const id = oldItem.id;
    this.listaDeCompra.splice(Number(id)-1,1, itemEditado);
    // this.atualizaLocalStorage();
  }

  atualizaLocalStorage() {
    localStorage.setItem('items', JSON.stringify(this.listaDeCompra));
  }
}
