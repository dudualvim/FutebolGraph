import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-futebol',
  templateUrl: './futebol.component.html',
  styleUrls: ['./futebol.component.css']
})
export class FutebolComponent implements OnInit{
  position = "";

  arrayJogadores: any[] = [];

  jogadores = [
    {"JogadorId": 1, "JogadorNome": 'Teste',"JogadorForca": 0, "JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 2, "JogadorNome": 'Roger', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 3, "JogadorNome": 'Eduardo', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 4, "JogadorNome": 'R10', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 5, "JogadorNome": 'R10', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 6, "JogadorNome": 'R10', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 7, "JogadorNome": 'R10', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 8, "JogadorNome": 'R10', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 9, "JogadorNome": 'R10', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 10, "JogadorNome": 'R10', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 11, "JogadorNome": 'R10', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
  ];

  keys = ['JogadorNome', 'JogadorForca', 'JogadorX', 'JogadorY'];

  constructor(private service: SharedService){ }

  ngOnInit(): void { }

  /*
    Função responsável por realizar uma requisição POST
    (botão de enviar)
  */
  Submit() {
    const redux = array => array.map(o => this.keys.reduce((acc, curr) => {
      acc[curr] = o[curr];
      return acc;
    }, {}));

    this.service.addJogador(redux(this.arrayJogadores)).subscribe(res => {
      alert(res.toString());
    });
  }

  @ViewChild('dropZone', {read: ElementRef, static: true})
  dropZone: ElementRef;
  _pointerPosition;

  /*
    Função responsável por obter os valores X e Y.
  */
  atualizarPosicao(data: any, x: number, y: number) {
    for (let i in this.jogadores) {
      if (this.jogadores[i] === data) {
        this.jogadores[i]["JogadorX"] = x;
        this.jogadores[i]["JogadorY"] = y;
      }
    }
  }

  /*
    Função responsável por realizar o movimento de um jogador(vértice)
    e chamar a função atualizarPosicao para obter os valores de X e Y.
  */
  moved(event) {
    this._pointerPosition = event.pointerPosition;
    this.position = `Posição X: ${this._pointerPosition.x} - Y: ${this._pointerPosition.y}`;
    this.atualizarPosicao(event.source.data, this._pointerPosition.x, this._pointerPosition.y);
  }


  /*
    Responsável por persistir os itens dentro do campo de futebol.
    Sempre que um jogador é colocado no campo, esta função coloca o jogador no array:
    arrayJogadores[].
  */
  itemDropped(event) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.arrayJogadores, event.previousIndex, event.currentIndex);
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
    // console.warn(this.arrayJogadores);
  }

  /*
    Função complementar para adicionar os jogadores colocados no campo em um array.
  */
  addField(fieldType: object, index: number) {
    this.arrayJogadores.splice(index, 0, fieldType);
  }
}

