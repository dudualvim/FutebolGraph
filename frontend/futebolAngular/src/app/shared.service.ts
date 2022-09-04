import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly  APIUrl = 'http://127.0.0.1:8000/';

  constructor(private http:HttpClient) { }

  getJogList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/jogadores/');
  }

  addJogador(val: any){
    return this.http.post(this.APIUrl + '/jogadores/', val);
  }

  updateJogador(val: any){
    return this.http.put(this.APIUrl + '/jogadores/', val);
  }

  deleteJogador(val: any){
    return this.http.delete(this.APIUrl + '/jogadores/', val);
  }


}
