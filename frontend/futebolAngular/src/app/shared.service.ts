import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IJogador } from "./futebol/model";

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private availablePlayers = new BehaviorSubject<IJogador[]>(null);

  readonly  APIUrl = 'http://127.0.0.1:8000/';

  constructor(private http:HttpClient) { }

  addJogador(val: any){
    return this.http.post<IJogador>(this.APIUrl + 'jogadores/', val);
  }

  updateJogador(val: any){
    return this.http.put(this.APIUrl + 'jogadores', val);
  }

  deleteJogador(val: any){
    return this.http.delete(this.APIUrl + 'jogadores', val);
  }
}
