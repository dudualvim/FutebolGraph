import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDragMove, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {}
  position = "";

  panelOpenState = false;

  @ViewChild("dropZone", { read: ElementRef, static: true })
  dropZone: ElementRef;

  _currentIndex;
  _currentField;
  _pointerPosition;

  // Função criada somente para mostrar que os valores de X e Y estão sendo atualizados ao mover  
  teste(event: CdkDragEnd) {
    let e = event.source.data;
    console.log(e);
  }

  // Responsável por pegar as coordenadas de cada vértice
  moved(event: CdkDragMove) {
    this._pointerPosition = event.pointerPosition;
    this.position = `Posição X: ${this._pointerPosition.x} - Y: ${this._pointerPosition.y}`;
    this.atualizarPosicao(event.source.data, this._pointerPosition.x, this._pointerPosition.y);
  }
  
  // No caso, esse array de objetos são os vértices
  jogadores: {valor: number, nome: string, x: number, y: number}[] = [
    { "valor": 1, "nome": "R10", "x": 0, "y": 0},
    { "valor": 2, "nome": "R9", "x": 0, "y": 0},
    { "valor": 3, "nome": "R ", "x": 0, "y": 0},
    { "valor": 4, "nome": "Rs0", "x": 0, "y": 0},
    { "valor": 5, "nome": "Rd0", "x": 0, "y": 0},
    { "valor": 6, "nome": "Ra0", "x": 0, "y": 0},
    { "valor": 7, "nome": "R1f", "x": 0, "y": 0},
  ]

  // Atualiza a posição de cada vértice 
  atualizarPosicao(data: any, x: number, y: number){
    for(let i in this.jogadores){
      if(this.jogadores[i] === data){
        this.jogadores[i]["x"] = x;
        this.jogadores[i]["y"] = y;
      }
    }
  }

  even = <any[]>[];

  itemDropped(event: CdkDragDrop<any[]>) {
    const rect = event.item.element.nativeElement.getBoundingClientRect();
    const rectDrop = this.dropZone.nativeElement.getBoundingClientRect();
    const top = rect.top + event.distance.y - rectDrop.top;
    const left = rect.left + event.distance.x - rectDrop.left;
    if (top >= 0 && top <= rectDrop.height - rect.height &&
        left >= 0 && left <= rectDrop.width - rect.width) {
      event.item.data.top = top + "px";
      event.item.data.left = left + "px"; 
      this.addField({ ...event.item.data }, event.currentIndex);
      
    }
  }

  addField(number: number, index: number) {
    this.even.splice(index, 0, number);
  }
}
