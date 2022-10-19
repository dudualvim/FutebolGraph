import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import {SharedService} from "../shared.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-jogador-form',
  templateUrl: './jogador-form.component.html',
  styleUrls: ['./jogador-form.component.css']
})
export class JogadorFormComponent implements OnInit {

  jogadorForm = new FormGroup({
    JogadorId: new FormControl(null),
    JogadorNome: new FormControl(null),
    JogadorForca: new FormControl(null),
    JogadorX: new FormControl(null),
    JogadorY: new FormControl(null)
  })


  constructor(private service: SharedService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.service.addJogador(this.jogadorForm.value).subscribe(res => {
      alert(res.toString());
    });
  }


  items = [
    {"JogadorNome": 'Son', "JogadorForca": 10, "JogadorX": 1, "JogadorY": 5},
    {"JogadorNome": 'André', "JogadorForca": 10, "JogadorX": 1, "JogadorY": 5}
  ];

  basket = [];

  Submit(){
    this.service.addJogador(this.basket).subscribe(res => {
      alert(res.toString());
    });
  }


  drop(event: CdkDragDrop<object[]>) {
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,

        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.warn(this.basket);
  }
}
