import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  public getClientId( id: string) {
    return this.http.get('http://localhost:8080/cliente/consultar/clientes').pipe(
      map(data => data)
    );
  }


}
