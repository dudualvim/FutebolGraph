import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {
  CdkDragStart,
  CdkDragMove,
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  CdkDragEnd,
  CdkDrag
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Angular';
  position = "";

  botaoClicado() {
    const invalido = this.jogadores.some(jogador => {
      return jogador.x < 16 || jogador.x > 1900 || jogador.y < 80 || jogador.y > 890;
    })
    if(invalido){
      alert('Todos os jogadores devem estar em campo!');
    }else{
      alert('Grafo Feito!');
    }
  }
  constructor() {
  }

  ngOnInit() {
  }

  panelOpenState = false;

  @ViewChild('dropZone', {read: ElementRef, static: true})
  dropZone: ElementRef;

  _currentIndex;
  _currentField;
  _pointerPosition;

  // Função criada somente para mostrar que os valores de X e Y estão sendo atualizados ao mover
  teste(event: CdkDragEnd) {
    let e = event.source.data;
    console.log(e);
  }

  jogadores: { valor: number; nome: string; x: number; y: number }[] = [
    {valor: 1, nome: 'R10', x: 0, y: 0},
    {valor: 2, nome: 'R9', x: 0, y: 0},
    {valor: 3, nome: 'R ', x: 0, y: 0},
    {valor: 4, nome: 'Rs0', x: 0, y: 0},
    {valor: 5, nome: 'Rd0', x: 0, y: 0},
    {valor: 6, nome: 'Ra0', x: 0, y: 0},
    {valor: 7, nome: 'R1f', x: 0, y: 0},
    {valor: 8, nome: 'R1f', x: 0, y: 0},
    {valor: 9, nome: 'R1f', x: 0, y: 0},
    {valor: 10, nome: 'R1f', x: 0, y: 0},
    {valor: 11, nome: 'R1f', x: 0, y: 0},
  ];

  // Atualiza a posição de cada vértice
  atualizarPosicao(data: any, x: number, y: number) {
    for (let i in this.jogadores) {
      if (this.jogadores[i] === data) {
        this.jogadores[i]["x"] = x;
        this.jogadores[i]["y"] = y;
      }
    }
  }

  fields: any[] = [];

  // Responsável por pegar as coordenadas de cada vértice
  moved(event: CdkDragMove) {
    this._pointerPosition = event.pointerPosition;
    this.position = `Posição X: ${this._pointerPosition.x} - Y: ${this._pointerPosition.y}`;
    this.atualizarPosicao(event.source.data, this._pointerPosition.x, this._pointerPosition.y);
  }


  itemDropped(event: CdkDragDrop<any[]>) {
    const rect = event.item.element.nativeElement.getBoundingClientRect();
    const rectDrop = this.dropZone.nativeElement.getBoundingClientRect();
    const top = rect.top + event.distance.y - rectDrop.top;
    const left = rect.left + event.distance.x - rectDrop.left;
    console.log(rect, rectDrop, top, left, event);
    if (
      top >= 0 &&
      top <= rectDrop.height - rect.height &&
      left >= 0 &&
      left <= rectDrop.width - rect.width
    ) {
      event.item.data.top = top + 'px';
      event.item.data.left = left + 'px';
      this.addField({...event.item.data}, event.currentIndex);
    }
  }

  addField(fieldType: number, index: number) {
    this.fields.splice(index, 0, fieldType);
  }

}

