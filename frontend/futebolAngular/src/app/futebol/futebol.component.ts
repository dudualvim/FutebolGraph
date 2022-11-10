import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-futebol',
  templateUrl: './futebol.component.html',
  styleUrls: ['./futebol.component.css']
})
export class FutebolComponent implements OnInit{
  position = "Posição do Jogador Selecionado";

  arrayJogadores: any[] = [];

  jogadores = [
    {"JogadorId": 1, "JogadorNome": 'Alisson',"JogadorForca": 0, "JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 2, "JogadorNome": 'Danilo', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 3, "JogadorNome": 'Thiago Silva', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 4, "JogadorNome": 'Marquinhos', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 5, "JogadorNome": 'Casemiro', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 6, "JogadorNome": 'Alexandro', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 7, "JogadorNome": 'Raphinha', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 8, "JogadorNome": 'Paquetá', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 9, "JogadorNome": 'Richarlison', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 10, "JogadorNome": 'Neymar', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
    {"JogadorId": 11, "JogadorNome": 'Vini Jr.', "JogadorForca": 0,"JogadorX": 0, "JogadorY": 0},
  ];

  keys = ['JogadorNome', 'JogadorForca', 'JogadorX', 'JogadorY'];

  title = 'mouse-hover';
  showImage: boolean;
  constructor(private service: SharedService){
    this.showImage = false;
  }

  ngOnInit(): void { }

  /*
    Função responsável por realizar uma requisição POST
    (botão de enviar)
  */
  Submit() {
    this.service.addJogador((this.arrayJogadores)).subscribe(res => {
      let t1 = res.toString();
      document.getElementById("resultDiv").innerHTML = t1;
      this.desenharAresta(t1);
    });
  }

  desenharAresta(t1: string) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg' ,'svg');
    svg.setAttribute('width', '1470');
    svg.setAttribute('height', '800');

    var matches;

    var pattern = /\[(.*?)\]/g;
    var match;
    while ((match = pattern.exec(t1)) != null)
    {
      matches = match[1];
    }

    let index = matches.indexOf(',');
    let p1 = matches.substring(0, index);
    let p2 = matches.substring(index+1);

    console.log(p1);
    console.log(p2);

    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 10; j++) {
        if(this.jogadores[i]['JogadorNome'] === p1 && this.jogadores[j]['JogadorNome'] === p2){
          const line = document.createElementNS('http://www.w3.org/2000/svg' , 'line');
          line.setAttribute('x1', this.arrayJogadores[i]['JogadorX']); // X inicial
          line.setAttribute('y1', this.arrayJogadores[i]['JogadorY']); // Y Inicial
          line.setAttribute('x2', this.arrayJogadores[j]['JogadorX']); // X Final
          line.setAttribute('y2', this.arrayJogadores[j]['JogadorY']); // Y Final
          line.setAttribute('style', 'stroke:rgb(255,0,0); stroke-width:2');
          svg.appendChild(line);
          document.getElementById('drop-list').appendChild(svg);
        } else {
          const line = document.createElementNS('http://www.w3.org/2000/svg' , 'line');
          line.setAttribute('x1', this.arrayJogadores[i]['JogadorX']); // X inicial
          line.setAttribute('y1', this.arrayJogadores[i]['JogadorY']); // Y Inicial
          line.setAttribute('x2', this.arrayJogadores[j]['JogadorX']); // X Final
          line.setAttribute('y2', this.arrayJogadores[j]['JogadorY']); // Y Final
          line.setAttribute('style', 'stroke:rgb(0,0,0); stroke-width:2');
          svg.appendChild(line);
          document.getElementById('drop-list').appendChild(svg);
        }
      }
    }
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
      this.jogadores = this.jogadores.filter(jogador => jogador.JogadorId != event.item.data.JogadorId)
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

