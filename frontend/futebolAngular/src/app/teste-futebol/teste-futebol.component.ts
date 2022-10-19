import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, CdkDragEnd, CdkDragMove, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SharedService} from "../shared.service";
import {IJogador} from "../futebol/model";

@Component({
  selector: 'app-teste-futebol',
  templateUrl: './teste-futebol.component.html',
  styleUrls: ['./teste-futebol.component.css']
})
export class TesteFutebolComponent implements OnInit {
  // position = "";
  //
  // constructor(private service: SharedService){ }
  //
  // ngOnInit(): void {
  //
  // }
  //
  // @ViewChild('dropZone', {read: ElementRef, static: true})
  // dropZone: ElementRef;
  // _pointerPosition;
  //
  jogadores = [
    {JogadorId: 1, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 2, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 3, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 4, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 5, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 6, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 7, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 8, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 9, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 10, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
    {JogadorId: 11, JogadorNome: 'R10', JogadorX: 0, JogadorY: 0},
  ];
  // //
  // // novosJogadores = [];
  // //
  // // // Atualiza a posição de cada vértice
  // // atualizarPosicao(data: any, x: number, y: number) {
  // //   for (let i in this.jogadores) {
  // //     if (this.jogadores[i] === data) {
  // //       this.jogadores[i]["JogadorX"] = x;
  // //       this.jogadores[i]["JogadorY"] = y;
  // //     }
  // //   }
  // // }
  // //
  // fields: any[] = [];
  // //
  // // // Responsável por pegar as coordenadas de cada vértice
  // // // moved(event: CdkDragDrop<object[]>) {
  // // //   this._pointerPosition = event.dropPoint;
  // // //   this.position = `Posição X: ${this._pointerPosition.x} - Y: ${this._pointerPosition.y}`;
  // // //   this.atualizarPosicao(event.container.data, this._pointerPosition.x, this._pointerPosition.y);
  // // //   if(event.container.dropped){
  // // //     console.warn(event.container.data);
  // // //   }
  // // // }
  // //
  //
  // drop(event: CdkDragDrop<object[]>) {
  //   console.log("drop");
  //   if (event.previousContainer === event.container) {
  //
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
  //
  // moved(event) {
  //   this._pointerPosition = event.pointerPosition;
  // }
  //
  // itemDropped(event) {
  //   const rect = event.item.element.nativeElement.getBoundingClientRect();
  //   const rectDrop = this.dropZone.nativeElement.getBoundingClientRect();
  //   const top = rect.top + event.distance.y - rectDrop.top;
  //   const left = rect.left + event.distance.x - rectDrop.left;
  //   console.log("ALOOA");
  //   if(top >= 0 && top <= rectDrop.height - rect.height &&
  //     left >= 0 && left <= rectDrop.width - rect.width) {
  //     event.item.data.top = top + 'px';
  //     event.item.data.left = left + 'px';
  //     this.addField({ ...event.item.data }, event.currentIndex);
  //   }
  //   console.warn(this.fields);
  // }
  //
  // addField(fieldType: string, index: number) {
  //   this.fields.splice(index, 0, fieldType);
  // }

  // Funcionando
  ngOnInit(): void {

  }

  @ViewChild('dropZone', { read: ElementRef, static: true })
  dropZone: ElementRef;
  _pointerPosition: any;

  fields: any[] = [];

  moved(event) {
    this._pointerPosition = event.pointerPosition;
  }

  itemDropped(event) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      event.item.data.top =
        this._pointerPosition.y -
        this.dropZone.nativeElement.getBoundingClientRect().top +
        'px';
      event.item.data.left =
        this._pointerPosition.x -
        this.dropZone.nativeElement.getBoundingClientRect().left +
        'px';
      this.addField({ ...event.item.data }, event.currentIndex);
    }
    console.warn(this.fields);
  }

  addField(fieldType: string, index: number) {
    this.fields.splice(index, 0, fieldType);
  }

  changePosition(event, field: { top: string; left: string }) {
    debugger;
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    const rectElement =
      event.item.element.nativeElement.getBoundingClientRect();

    let top = +field.top.replace('px', '') + event.distance.y;
    let left = +field.left.replace('px', '') + event.distance.x;
    const out =
      top < 0 ||
      left < 0 ||
      top > rectZone.height - rectElement.height ||
      left > rectZone.width - rectElement.width;
    if (!out) {
      field.top = top + 'px';
      field.left = left + 'px';
    } else {
      this.fields = this.fields.filter((x) => x != field);
    }
  }
}
